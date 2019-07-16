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

interface IProps {
  commitsMade: number;
  linesAdded: number;
  linesDeleted: number;
  commits: ICommitData[];
}

interface IStateProps {
  timeSpan: TIME_SPAN;
}

interface IDispatchProps {
  setTimeSpan: (timeSpan: TIME_SPAN) => any;
}

const commitLeaderboardInitial: IDonutGraphData[] = [];
const commitsOverTimeInitial: IBarGraphData[] = [];

type Props = IProps & IStateProps & IDispatchProps;

const getLeaderboardData = (
  commits: ICommitData[],
  dateToCompare: Date
): IDonutGraphData[] => {
  const leaderboardProcessedData: Map<string, number> = new Map();
  const leaderboardGraphData: IDonutGraphData[] = [];
  commits.forEach(commit => {
    const { author, createdAt } = commit;
    if (new Date(createdAt).getTime() >= dateToCompare.getTime()) {
      const leaderboardCommitCount:
        | number
        | undefined = leaderboardProcessedData.get(author);
      if (leaderboardCommitCount !== undefined) {
        leaderboardProcessedData.set(author, leaderboardCommitCount + 1);
      } else {
        leaderboardProcessedData.set(author, 1);
      }
    }
  });
  leaderboardProcessedData.forEach((value, key) => {
    leaderboardGraphData.push({ label: key, value: value });
  });

  return leaderboardGraphData;
};

const getCommitsOverTimeData = (
  commits: ICommitData[],
  dateToCompare: Date
): IBarGraphData[] => {
  const commitsOverTimeProcessedData: Map<number, number> = new Map();
  const commitsOverTimeGraphData: IBarGraphData[] = [];
  commits.forEach(commit => {
    const { createdAt } = commit;
    const date = new Date(createdAt);
    date.setHours(0, 0, 0, 0);
    const time = date.getTime();
    if (time >= dateToCompare.getTime()) {
      const commitCountForDate:
        | number
        | undefined = commitsOverTimeProcessedData.get(time);
      if (commitCountForDate !== undefined) {
        commitsOverTimeProcessedData.set(time, commitCountForDate + 1);
      } else {
        commitsOverTimeProcessedData.set(time, 1);
      }
    }
  });
  commitsOverTimeProcessedData.forEach((value, key) => {
    commitsOverTimeGraphData.push({ x: key, y: value });
  });

  return commitsOverTimeGraphData;
};

const CommitsPage: React.FC<Props> = props => {
  const { commits, commitsMade, linesAdded, linesDeleted, timeSpan } = props;

  const [commitLeaderboard, setCommitLeaderBoard] = useState(
    commitLeaderboardInitial
  );

  const [commitsOverTime, setCommitsOverTime] = useState(
    commitsOverTimeInitial
  );

  useEffect(() => {
    const now = new Date();
    let timeToCompareTo: Date = new Date();
    switch (timeSpan) {
      case TIME_SPAN.LAST_7_DAYS:
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(now.getDate() - 7);
        sevenDaysAgo.setHours(0, 0, 0, 0);
        timeToCompareTo = sevenDaysAgo;
        break;
      case TIME_SPAN.LAST_MONTH:
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(now.getMonth() - 1, now.getDate());
        oneMonthAgo.setHours(0, 0, 0, 0);
        timeToCompareTo = oneMonthAgo;
        break;
      case TIME_SPAN.LAST_YEAR:
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(
          now.getFullYear() - 1,
          now.getMonth(),
          now.getDate()
        );
        oneYearAgo.setHours(0, 0, 0, 0);
        timeToCompareTo = oneYearAgo;
        break;
    }
    setCommitLeaderBoard(getLeaderboardData(commits, timeToCompareTo));
    setCommitsOverTime(getCommitsOverTimeData(commits, timeToCompareTo));
  }, [commits, timeSpan]);

  const lineDataAddition = [
    { x: new Date("May 20 2017").getTime(), y: 1242 },
    { x: new Date("May 23 2017").getTime(), y: 1217 },
    { x: new Date("May 24 2017").getTime(), y: 1610 },
    { x: new Date("May 26 2017").getTime(), y: 1963 },
    { x: new Date("May 27 2017").getTime(), y: 1521 },
    { x: new Date("May 28 2017").getTime(), y: 1423 },
    { x: new Date("May 29 2017").getTime(), y: 1352 },
    { x: new Date("May 30 2017").getTime(), y: 1777 },
    { x: new Date("May 17 2017").getTime(), y: 1213 },
    { x: new Date("May 16 2017").getTime(), y: 1016 },
    { x: new Date("May 18 2017").getTime(), y: 1264 },
    { x: new Date("May 13 2017").getTime(), y: 1186 }
  ];

  const lineDataDeletion = [
    { x: new Date("May 20 2017").getTime(), y: 542 },
    { x: new Date("May 23 2017").getTime(), y: 217 },
    { x: new Date("May 24 2017").getTime(), y: 2670 },
    { x: new Date("May 26 2017").getTime(), y: 963 },
    { x: new Date("May 27 2017").getTime(), y: 1361 },
    { x: new Date("May 28 2017").getTime(), y: 223 },
    { x: new Date("May 29 2017").getTime(), y: 810 },
    { x: new Date("May 30 2017").getTime(), y: 777 },
    { x: new Date("May 17 2017").getTime(), y: 213 },
    { x: new Date("May 16 2017").getTime(), y: 416 },
    { x: new Date("May 18 2017").getTime(), y: 264 },
    { x: new Date("May 13 2017").getTime(), y: 386 }
  ];

  return (
    <Container>
      <div style={{ paddingTop: "20px" }}>
        <Row>
          <Col>
            <Row>
              <Col>
                <SummaryCard count={commitsMade} subtitle={"commits"} />
              </Col>
              <Col>
                <SummaryCard count={linesAdded} subtitle={"additions"} />
              </Col>
              <Col>
                <SummaryCard count={linesDeleted} subtitle={"deletions"} />
              </Col>
            </Row>
            <NumberVsTimeBarGraph
              title={"Commits per Day"}
              data={commitsOverTime}
              xAxisLabel={"Date"}
              yAxisLabel={"Commits"}
            />
            <NumberVsTimeMultiLineGraph
              title={"Additions and Deletions per Day"}
              data={[lineDataAddition, lineDataDeletion]}
              xAxisLabel={"Date"}
              yAxisLabel={"Lines"}
              lineLabels={["Additions", "Deletions"]}
              legend={true}
            />
          </Col>
          <Col>
            <DonutGraphWithLeaderboard
              data={commitLeaderboard}
              title={"Top Users by Commits on Main Branch"}
              category={"Commits"}
              maximum={5}
            />
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
