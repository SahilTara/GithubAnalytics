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
import { IPullRequest } from "../../types/IPullRequest";

import {
  getAverageTimeToMergePrsAsHoursData,
  getMergedPrsLeaderboardData,
  getOpenedPrsLeaderboardData,
  getOpenedPrsOverTimeData
} from "./utils";
import NumberVsTimeLineGraph from "../../components/Graphs/Line/NumberVsTimeLineGraph";

import styles from "./styles.module.css";
import classNames from "classnames";

interface IProps {
  prsOpened: number;
  prsMerged: number;
  prs: IPullRequest[];
}

interface IStateProps {
  timeSpan: TIME_SPAN;
}

interface IDispatchProps {
  setTimeSpan: (timeSpan: TIME_SPAN) => any;
}

const prsOpenedLeaderboardInitial: IDonutGraphData[] = [];
const prsMergedLeaderboardInitial: IDonutGraphData[] = [];

const averageTimeToMergePrsInitial: IBarGraphData[] = [];
const openedPullRequestsOverTimeInitial: IBarGraphData[] = [];

type Props = IProps & IStateProps & IDispatchProps;

const PullRequestPage: React.FC<Props> = props => {
  const { prs, prsOpened, prsMerged, timeSpan, setTimeSpan } = props;

  const timeSpans = [
    TIME_SPAN.LAST_7_DAYS,
    TIME_SPAN.LAST_MONTH,
    TIME_SPAN.LAST_YEAR
  ];

  const [prsOpenedLeaderboard, setPrsOpenedLeaderboard] = useState(
    prsOpenedLeaderboardInitial
  );
  const [prsMergedLeaderboard, setPrsMergedLeaderboard] = useState(
    prsMergedLeaderboardInitial
  );

  const [averageTimeToMergePrs, setAverageTimeToMergePrs] = useState(
    averageTimeToMergePrsInitial
  );
  const [openedPullRequestsOverTime, setOpenedPullRequestsOverTime] = useState(
    openedPullRequestsOverTimeInitial
  );

  const selectTimeSpan = (key: string) => {
    setTimeSpan(key as TIME_SPAN);
  };

  useEffect(() => {
    const timeToCompareTo = getTimeSpanStartDate(timeSpan);
    setPrsOpenedLeaderboard(getOpenedPrsLeaderboardData(prs, timeToCompareTo));
    setPrsMergedLeaderboard(getMergedPrsLeaderboardData(prs, timeToCompareTo));
    setAverageTimeToMergePrs(
      getAverageTimeToMergePrsAsHoursData(prs, timeToCompareTo)
    );
    setOpenedPullRequestsOverTime(
      getOpenedPrsOverTimeData(prs, timeToCompareTo)
    );
  }, [prs, timeSpan]);

  const hasData =
    prsOpenedLeaderboard.length > 0 ||
    prsMergedLeaderboard.length > 0 ||
    averageTimeToMergePrs.length > 0 ||
    openedPullRequestsOverTime.length > 0;

  return (
    <Container className="show-grid">
      {!hasData && (
        <h2 className={classNames(styles.vert_centre)}>
          Sorry, No Graphable Data Found For This Range
        </h2>
      )}
      <div style={{ paddingTop: "20px" }}>
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
        <Row>
          <Col>
            <Row>
              <Col>
                <SummaryCard count={prsOpened} subtitle={"PRs Opened"} />
              </Col>
              <Col>
                <SummaryCard count={prsMerged} subtitle={"PRs Merged"} />
              </Col>
            </Row>
            {averageTimeToMergePrs.length > 0 && (
              <NumberVsTimeLineGraph
                title={"Average Time to Merge PRs (by create date)"}
                data={averageTimeToMergePrs}
                timeSpan={timeSpan}
                xAxisLabel={"Date"}
                yAxisLabel={"Time taken to merge (hours)"}
              />
            )}
            {openedPullRequestsOverTime.length > 0 && (
              <NumberVsTimeBarGraph
                title={"PRs opened per Day"}
                data={openedPullRequestsOverTime}
                timeSpan={timeSpan}
                xAxisLabel={"Date"}
                yAxisLabel={"PRs Opened"}
              />
            )}
          </Col>
          <Col>
            {prsMergedLeaderboard.length > 0 && (
              <DonutGraphWithLeaderboard
                data={prsMergedLeaderboard}
                title={"Top Users by PRs Merged"}
                category={"PRs Merged"}
                maximum={5}
              />
            )}
            {prsOpenedLeaderboard.length > 0 && (
              <DonutGraphWithLeaderboard
                data={prsOpenedLeaderboard}
                title={"Top Users by PRs Opened"}
                category={"PRs Opened"}
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
)(PullRequestPage);
