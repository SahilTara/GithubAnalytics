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
              />
              <NumberVsTimeMultiLineGraph
                title={"Compare Pull Requests Created"}
                data={prsOverTime}
                xAxisLabel={"Date"}
                yAxisLabel={"Pull requests"}
                lineLabels={["Sahil", "Mary"]}
                legend={false}
                width={800}
              />
              <NumberVsTimeMultiLineGraph
                title={"Compare Commits"}
                data={commitsOverTime}
                xAxisLabel={"Date"}
                yAxisLabel={"Commits"}
                lineLabels={["Sahil", "Mary"]}
                legend={false}
                width={800}
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
