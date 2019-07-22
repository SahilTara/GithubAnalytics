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
import { ICommitData } from "../../types/ICommitData";
import SelectableItems from "../../components/SelectableItems";
import {
  getLeaderboardData,
  getCommitsOverTimeData,
  getAdditionsAndDeletionsData
} from "./utils";
import { getTimeSpanStartDate } from "../../utils/getTimeSpanStartDate";
import classNames from "classnames";
import styles from "./styles.module.css";

interface IProps {
  /**
   * Total commits made
   *
   * @type {number}
   * @memberof IProps
   */
  commitsMade: number;

  /**
   * Total lines added
   *
   * @type {number}
   * @memberof IProps
   */
  linesAdded: number;

  /**
   * Total lines deleted
   *
   * @type {number}
   * @memberof IProps
   */
  linesDeleted: number;

  /**
   * Commit data, which is used for graphing info on the page
   *
   * @type {ICommitData[]}
   * @memberof IProps
   */
  commits: ICommitData[];
}

interface IStateProps {
  timeSpan: TIME_SPAN;
}

interface IDispatchProps {
  setTimeSpan: (timeSpan: TIME_SPAN) => any;
}

// Initial states for state variables
const commitLeaderboardInitial: IDonutGraphData[] = [];
const commitsOverTimeInitial: IBarGraphData[] = [];
const additionsAndDeletionsInitial: IBarGraphData[][] = [];

type Props = IProps & IStateProps & IDispatchProps;

/**
 * Page to show commit related info.
 */
const CommitsPage: React.FC<Props> = ({
  commits,
  commitsMade,
  linesAdded,
  linesDeleted,
  timeSpan,
  setTimeSpan
}) => {
  const timeSpans = [
    TIME_SPAN.LAST_7_DAYS,
    TIME_SPAN.LAST_MONTH,
    TIME_SPAN.LAST_YEAR
  ];

  const [commitLeaderboard, setCommitLeaderBoard] = useState(
    commitLeaderboardInitial
  );

  const [commitsOverTime, setCommitsOverTime] = useState(
    commitsOverTimeInitial
  );
  const [additionsAndDeletions, setAdditionsAndDeletions] = useState(
    additionsAndDeletionsInitial
  );

  const selectTimeSpan = (key: string) => {
    // key will always be timespan here.
    setTimeSpan(key as TIME_SPAN);
  };

  useEffect(() => {
    const timeToCompareTo = getTimeSpanStartDate(timeSpan);
    setCommitLeaderBoard(getLeaderboardData(commits, timeToCompareTo));
    setCommitsOverTime(getCommitsOverTimeData(commits, timeToCompareTo));
    setAdditionsAndDeletions(
      getAdditionsAndDeletionsData(commits, timeToCompareTo)
    );
  }, [commits, timeSpan]);

  const linesWereChanged = linesAdded > 0 || linesDeleted > 0;
  const hasData =
    commitLeaderboard.length > 0 ||
    commitsOverTime.length > 0 ||
    linesWereChanged;

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
                <SummaryCard count={commitsMade} subtitle={"Commits"} />
              </Col>
              <Col>
                <SummaryCard count={linesAdded} subtitle={"Additions"} />
              </Col>
              <Col>
                <SummaryCard count={linesDeleted} subtitle={"Deletions"} />
              </Col>
            </Row>
            {/* Graphs */}
            <>
              {commitsMade > 0 && (
                <NumberVsTimeBarGraph
                  title={"Commits per Day"}
                  data={commitsOverTime}
                  xAxisLabel={"Date"}
                  yAxisLabel={"Commits"}
                />
              )}
              {linesWereChanged && (
                <NumberVsTimeMultiLineGraph
                  title={"Additions and Deletions per Day"}
                  data={additionsAndDeletions}
                  xAxisLabel={"Date"}
                  yAxisLabel={"Lines"}
                  lineLabels={["Additions", "Deletions"]}
                  legend={true}
                />
              )}
            </>
          </Col>
          <Col>
            {/* Leaderboard + Donut Graphs */}
            {commitLeaderboard.length > 0 && (
              <DonutGraphWithLeaderboard
                data={commitLeaderboard}
                title={"Top Users by Commits on Main Branch"}
                category={"Commits"}
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
)(CommitsPage);
