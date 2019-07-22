import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DonutGraphWithLeaderboard from "../../components/Graphs/Radial/DonutGraphWithLeaderboard";
import SummaryCard from "../../components/SummaryCard";
import NumberVsTimeBarGraph from "../../components/Graphs/Bar/NumberVsTimeBarGraph";
import NumberVsTimeMultiLineGraph from "../../components/Graphs/Line/NumberVsTimeMultiLineGraph";
import IDonutGraphData from "../../types/IGraphData/IDonutGraphData";
import { TIME_SPAN } from "../../types/TimeSpan";
import { setTimeSpanAction } from "../../actions/repositoryInfoActions/setTimeSpan";
import { AppState } from "../../reducers";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import IBarGraphData from "../../types/IGraphData/IBarGraphData";
import SelectableItems from "../../components/SelectableItems";

import { getTimeSpanStartDate } from "../../utils/getTimeSpanStartDate";

import {
  getAverageTimeToCloseIssuesAsHoursData,
  getOpenedIssuesOverTimeData,
  getOpenedIssuesLeaderboardData,
  getClosedIssuesLeaderboardData
} from "./utils";
import NumberVsTimeLineGraph from "../../components/Graphs/Line/NumberVsTimeLineGraph";

import styles from "./styles.module.css";
import classNames from "classnames";
import { IIssueData } from "../../types/IIssueData";

interface IProps {
  /**
   * Total number of issues closed
   *
   * @type {number}
   * @memberof IProps
   */
  issuesClosed: number;
  /**
   * Total number of issues opened
   *
   * @type {number}
   * @memberof IProps
   */
  issuesOpened: number;
  /**
   * Issue data, which is used for graphing info on the page
   *
   * @type {IIssueData[]}
   * @memberof IProps
   */
  issues: IIssueData[];
}

interface IStateProps {
  timeSpan: TIME_SPAN;
}

interface IDispatchProps {
  setTimeSpan: (timeSpan: TIME_SPAN) => any;
}

// initial states for issues page
const issuesOpenedLeaderboardInitial: IDonutGraphData[] = [];
const issuesClosedLeaderboardInitial: IDonutGraphData[] = [];

const averageTimeToCloseIssuesinitial: IBarGraphData[] = [];
const openedIssuesOverTimeInitial: IBarGraphData[] = [];

type Props = IProps & IStateProps & IDispatchProps;

/**
 * Page to show issue related info.
 */
const IssuesPage: React.FC<Props> = ({
  issues,
  issuesClosed,
  issuesOpened,
  timeSpan,
  setTimeSpan
}) => {
  const timeSpans = [
    TIME_SPAN.LAST_7_DAYS,
    TIME_SPAN.LAST_MONTH,
    TIME_SPAN.LAST_YEAR
  ];

  const [issuesOpenedLeaderboard, setIssuesOpenedLeaderboard] = useState(
    issuesOpenedLeaderboardInitial
  );
  const [issuesClosedLeaderboard, setIssuesClosedLeaderboard] = useState(
    issuesClosedLeaderboardInitial
  );

  const [averageTimeToCloseIssues, setAverageTimeToCloseIssues] = useState(
    averageTimeToCloseIssuesinitial
  );
  const [openedIssuesOverTime, setOpenedIssuesOverTime] = useState(
    openedIssuesOverTimeInitial
  );

  const selectTimeSpan = (key: string) => {
    setTimeSpan(key as TIME_SPAN);
  };

  useEffect(() => {
    const timeToCompareTo = getTimeSpanStartDate(timeSpan);
    setIssuesOpenedLeaderboard(
      getOpenedIssuesLeaderboardData(issues, timeToCompareTo)
    );
    setIssuesClosedLeaderboard(
      getClosedIssuesLeaderboardData(issues, timeToCompareTo)
    );
    setAverageTimeToCloseIssues(
      getAverageTimeToCloseIssuesAsHoursData(issues, timeToCompareTo)
    );
    setOpenedIssuesOverTime(
      getOpenedIssuesOverTimeData(issues, timeToCompareTo)
    );
  }, [issues, timeSpan]);

  const hasData =
    issuesOpenedLeaderboard.length > 0 ||
    issuesClosedLeaderboard.length > 0 ||
    averageTimeToCloseIssues.length > 0 ||
    openedIssuesOverTime.length > 0;

  return (
    <Container className="show-grid">
      {!hasData && (
        <h2 className={classNames(styles.vert_centre)}>
          Sorry, No Graphable Data Found For This Range
        </h2>
      )}
      <div style={{ paddingTop: "20px" }}>
        {/* Timespan Selector */}
        <Row style={{ paddingBottom: "20px" }}>
          <Col md={{ span: 2, offset: 10 }}>
            <SelectableItems
              options={timeSpans}
              title={timeSpan}
              className=""
              id="time-span"
              onChangeHook={selectTimeSpan}
            />
          </Col>
        </Row>
        {/* Main Content */}
        <Row>
          <Col>
            {/* Summary Cards */}
            <Row>
              <Col>
                <SummaryCard count={issuesOpened} subtitle={"Issues Opened"} />
              </Col>
              <Col>
                <SummaryCard count={issuesClosed} subtitle={"Issues Closed"} />
              </Col>
            </Row>
            {/* Graphs */}
            {averageTimeToCloseIssues.length > 0 && (
              <NumberVsTimeLineGraph
                title={"Average Time to Close Issues (by create date)"}
                data={averageTimeToCloseIssues}
                xAxisLabel={"Date"}
                yAxisLabel={"Time taken to close (hours)"}
              />
            )}
            {openedIssuesOverTime.length > 0 && (
              <NumberVsTimeBarGraph
                title={"Issues Opened Per Day"}
                data={openedIssuesOverTime}
                xAxisLabel={"Date"}
                yAxisLabel={"Issues Opened"}
              />
            )}
          </Col>

          <Col>
            {/* Leaderboard + Donut Graphs */}
            {issuesClosedLeaderboard.length > 0 && (
              <DonutGraphWithLeaderboard
                data={issuesClosedLeaderboard}
                title={"Top Users by Issues Closed"}
                category={"Issues"}
                maximum={5}
              />
            )}
            {issuesOpenedLeaderboard.length > 0 && (
              <DonutGraphWithLeaderboard
                data={issuesOpenedLeaderboard}
                title={"Top Users by Issues Opened"}
                category={"Issues"}
                maximum={5}
              />
            )}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

const mapStateToProps = (state: AppState): IStateProps => {
  const { timeSpan } = state.repositoryInfo;
  return {
    timeSpan
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  setTimeSpan: (timeSpan: TIME_SPAN) => {
    dispatch(setTimeSpanAction(timeSpan));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssuesPage);
