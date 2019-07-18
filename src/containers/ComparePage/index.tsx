import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import NumberVsTimeMultiLineGraph from "../../components/Graphs/Line/NumberVsTimeMultiLineGraph";
import CompareLegend from "../../components/CompareLegend";
import NumberVsTextBarGraph from "../../components/Graphs/Bar/NumberVsTextBarGraph";
import { TIME_SPAN } from "../../types/TimeSpan";
import IBarGraphData from "../../types/IGraphData/IBarGraphData";
import ITextBarGraphData from "../../types/IGraphData/ITextBarGraphData";
import IUserColor from "../../types/IUserColor";
import { getTimeSpanStartDate } from "../../utils/getTimeSpanStartDate";
import {
  getCommitsTotalData,
  getCommitsOverTimeData,
  getUsers,
  getIssuesTotalData,
  getIssuesOverTimeData,
  getPRsTotalData,
  getPRsOverTimeData
} from "./utils";
import { ICommitData } from "../../types/ICommitData";
import { AppState } from "../../reducers";
import { setTimeSpanAction } from "../../actions/repositoryInfoActions/setTimeSpan";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { IIssueData } from "../../types/IIssueData";
import { IPullRequest } from "../../types/IPullRequest";

interface IProps {
  commits: ICommitData[];
  issues: IIssueData[];
  prs: IPullRequest[];
}

interface IStateProps {
  timeSpan: TIME_SPAN;
}

interface IDispatchProps {
  setTimeSpan: (timeSpan: TIME_SPAN) => any;
}

const commitsTotalInitial: ITextBarGraphData[] = [];
const issuesTotalInitial: ITextBarGraphData[] = [];
const prsTotalInitial: ITextBarGraphData[] = [];
const commitsOverTimeInitial: IBarGraphData[][] = [];
const issuesOverTimeInitial: IBarGraphData[][] = [];
const prsOverTimeInitial: IBarGraphData[][] = [];
const usersInitial: IUserColor[] = [];

type Props = IProps & IStateProps & IDispatchProps;

const ComparePage: React.FC<Props> = props => {
  const { commits, issues, prs, timeSpan, setTimeSpan } = props;

  const timeSpans = [
    TIME_SPAN.LAST_7_DAYS,
    TIME_SPAN.LAST_MONTH,
    TIME_SPAN.LAST_YEAR
  ];

  const selectTimeSpan = (key: string) => {
    setTimeSpan(key as TIME_SPAN);
  };

  const [isTotal, changeMode] = useState(true);

  const [commitsTotal, setCommitsTotal] = useState(commitsTotalInitial);

  const [commitsOverTime, setCommitsOverTime] = useState(
    commitsOverTimeInitial
  );

  const [issuesTotal, setIssuesTotal] = useState(issuesTotalInitial);

  const [issuesOverTime, setIssuesOverTime] = useState(issuesOverTimeInitial);

  const [prsTotal, setPrsTotal] = useState(prsTotalInitial);

  const [prsOverTime, setPrsOverTime] = useState(prsOverTimeInitial);

  const [users, setUsers] = useState(usersInitial);

  useEffect(() => {
    const timeToCompareTo = getTimeSpanStartDate(timeSpan);
    setCommitsTotal(getCommitsTotalData(commits, timeToCompareTo));
    setCommitsOverTime(getCommitsOverTimeData(commits, timeToCompareTo));
    setIssuesTotal(getIssuesTotalData(issues, timeToCompareTo));
    setIssuesOverTime(getIssuesOverTimeData(issues, timeToCompareTo));
    setPrsTotal(getPRsTotalData(prs, timeToCompareTo));
    setPrsOverTime(getPRsOverTimeData(prs, timeToCompareTo));
    setUsers(getUsers(commits, prs, issues, timeToCompareTo));
  }, [commits, timeSpan]);

  // const [totalDataAddition, changeTotalData] = useState([
  //   { x: "Sahil", y: 22, color: "#FF0000" },
  //   { x: "Mary", y: 17, color: "#FF0000" },
  //   { x: "Michael", y: 6, color: "#FF0000" }
  // ]);

  // const changeColor = (item: { title: string; color: string }) => {
  //   const totalDataCopy = JSON.parse(JSON.stringify(totalDataAddition));
  //   totalDataCopy.forEach((datapoint: any) => {
  //     if (datapoint.title === item.title) {
  //       datapoint.color = item.color;
  //     }
  //   });
  //   changeTotalData(totalDataCopy);
  // };

  // const state = {
  //   items: totalDataAddition.map(item => {
  //     return { title: item.x, color: item.color };
  //   }),
  //   searchText: ""
  // };

  // const lineDataAddition = [
  //   { x: new Date("July 10 2019").getTime(), y: 1242 },
  //   { x: new Date("July 13 2019").getTime(), y: 1217 },
  //   { x: new Date("July 14 2019").getTime(), y: 1610 },
  //   { x: new Date("July 16 2019").getTime(), y: 1963 },
  //   { x: new Date("July 17 2019").getTime(), y: 1521 },
  //   { x: new Date("July 18 2019").getTime(), y: 1423 }
  // ];

  // const lineDataDeletion = [
  //   { x: new Date("July 10 2019").getTime(), y: 542 },
  //   { x: new Date("July 13 2019").getTime(), y: 217 },
  //   { x: new Date("July 14 2019").getTime(), y: 2670 },
  //   { x: new Date("July 16 2019").getTime(), y: 963 },
  //   { x: new Date("July 17 2019").getTime(), y: 1361 },
  //   { x: new Date("July 18 2019").getTime(), y: 223 }
  // ];

  return (
    <Container>
      <div style={{ paddingTop: "20px" }}>
        <Row>
          {isTotal ? (
            <Col>
              <NumberVsTextBarGraph
                title={"Compare Issues Closed"}
                data={issuesTotal}
                xAxisLabel={"Username"}
                yAxisLabel={"Issues"}
                width={800}
              />

              <NumberVsTextBarGraph
                title={"Compare Pull Requests"}
                data={prsTotal}
                xAxisLabel={"Username"}
                yAxisLabel={"Pull Requests"}
                width={800}
              />
              <NumberVsTextBarGraph
                title={"Compare Commits"}
                data={commitsTotal}
                xAxisLabel={"Username"}
                yAxisLabel={"Commits"}
                width={800}
              />
            </Col>
          ) : (
            <Col>
              <NumberVsTimeMultiLineGraph
                title={"Compare Issues Closed"}
                data={issuesOverTime}
                xAxisLabel={"Date"}
                yAxisLabel={"Issues"}
                lineLabels={["Sahil", "Mary"]}
                legend={false}
                width={800}
                timeSpan={TIME_SPAN.LAST_7_DAYS}
              />
              <NumberVsTimeMultiLineGraph
                title={"Compare Pull Requests Created"}
                data={prsOverTime}
                xAxisLabel={"Date"}
                yAxisLabel={"Pull requests"}
                lineLabels={["Sahil", "Mary"]}
                legend={false}
                width={800}
                timeSpan={TIME_SPAN.LAST_7_DAYS}
              />
              <NumberVsTimeMultiLineGraph
                title={"Compare Commits"}
                data={commitsOverTime}
                xAxisLabel={"Date"}
                yAxisLabel={"Commits"}
                lineLabels={["Sahil", "Mary"]}
                legend={false}
                width={800}
                timeSpan={TIME_SPAN.LAST_7_DAYS}
              />
            </Col>
          )}
          <Col xs={{ span: "3" }}>
            <CompareLegend
              state={users}
              modeCallBack={changeMode}
              // itemCallBack={changeColor}
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
)(ComparePage);
