import React, { useEffect, useState } from "react";
import IRepository from "../../types/IRespository";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";
import { AppState } from "../../reducers";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../actions";
import { getPullRequestInfoAction } from "../../actions/repositoryInfoActions/pullRequestInfo";
import { getIssueInfoAction } from "../../actions/repositoryInfoActions/issueInfo";
import { getCommitInfoAction } from "../../actions/repositoryInfoActions/commitInfo";
import OverviewPage from "../OverviewPage";
import { IIssueData } from "../../types/IIssueData";
import { IPullRequest } from "../../types/IPullRequest";
import { TIME_SPAN } from "../../types/TimeSpan";
import { setPrsLoadingStatusAction } from "../../actions/repositoryInfoActions/isPrsLoading";
import { setCommitsLoadingStatusAction } from "../../actions/repositoryInfoActions/isCommitsLoading";
import { setIssuesLoadingStatusAction } from "../../actions/repositoryInfoActions/isIssuesLoading";
import styles from "./styles.module.css";
import classNames from "classnames";
import CommitsPage from "../CommitsPage";
import { ICommitData } from "../../types/ICommitData";
import { getTimeSpanStartDate } from "../../utils/getTimeSpanStartDate";
import PullRequestPage from "../PullRequestPage";
import IssuesPage from "../IssuesPage";
import TopNavBar from "../../components/TopNavBar";
const Spinner = require("react-spinkit");

interface IProps extends RouteComponentProps {}
interface IStateProps {
  repo: IRepository;
  issues: IIssueData[];
  commits: ICommitData[];
  prs: IPullRequest[];
  timeSpan: TIME_SPAN;
  isPrsLoading: boolean;
  isCommitsLoading: boolean;
  isIssuesLoading: boolean;
}
interface IDispatchProps {
  getPullRequests: (repository: IRepository) => any;
  getIssues: (repository: IRepository) => any;
  getCommits: (repository: IRepository) => any;
  setPrsLoading: () => any;
  setIssuesLoading: () => any;
  setCommitsLoading: () => any;
}

type Props = IStateProps & IProps & IDispatchProps;

const RepoInfoPage: React.FC<Props> = props => {
  const {
    history,
    repo,
    getPullRequests,
    getIssues,
    getCommits,
    prs,
    issues,
    commits,
    timeSpan,
    isPrsLoading,
    isCommitsLoading,
    isIssuesLoading,
    setIssuesLoading,
    setCommitsLoading,
    setPrsLoading
  } = props;
  const { name, author } = repo;

  // Repo wasn't filled before reaching.
  if (name === "") {
    history.push("/");
  }

  useEffect(() => {
    if (repo.name) {
      setPrsLoading();
      setIssuesLoading();
      setCommitsLoading();
      getPullRequests(repo);
      getIssues(repo);
      getCommits(repo);
    }
  }, [repo.name]);

  // handle summary numbers
  const [issuesOpened, setIssuesOpened] = useState(0);
  const [issuesClosed, setIssuesClosed] = useState(0);

  const [prsOpened, setPrsOpened] = useState(0);
  const [prsMerged, setPrsMerged] = useState(0);

  const [commitsMade, setCommitMade] = useState(0);
  const [linesAdded, setLinesAdded] = useState(0);
  const [linesDeleted, setLinesDeleted] = useState(0);
  const doneLoading = !isPrsLoading && !isCommitsLoading && !isIssuesLoading;

  useEffect(() => {
    if (doneLoading) {
      let numberOfIssuesOpened = 0;
      let numberOfIssuesClosed = 0;
      let numberOfPrsOpened = 0;
      let numberOfPrsMerged = 0;
      let numberOfCommitsMade = 0;
      let totalAdditions = 0;
      let totalDeletions = 0;

      let timeSpanStartDate: Date = getTimeSpanStartDate(timeSpan);

      issues.forEach(issue => {
        if (new Date(issue.createdAt) >= timeSpanStartDate) {
          numberOfIssuesOpened += 1;
        }
        if (issue.closed && new Date(issue.closedAt) >= timeSpanStartDate) {
          numberOfIssuesClosed += 1;
        }
      });

      prs.forEach(pr => {
        if (new Date(pr.createdAt) >= timeSpanStartDate) {
          numberOfPrsOpened += 1;
        }
        if (pr.merged && new Date(pr.mergedAt) >= timeSpanStartDate) {
          numberOfPrsMerged += 1;
        }
      });

      commits.forEach(commit => {
        if (new Date(commit.createdAt) >= timeSpanStartDate) {
          numberOfCommitsMade += 1;
          totalAdditions += commit.additions;
          totalDeletions += commit.deletions;
        }
      });

      setIssuesOpened(numberOfIssuesOpened);
      setIssuesClosed(numberOfIssuesClosed);
      setPrsOpened(numberOfPrsOpened);
      setPrsMerged(numberOfPrsMerged);
      setCommitMade(numberOfCommitsMade);
      setLinesAdded(totalAdditions);
      setLinesDeleted(totalDeletions);
    }
  }, [timeSpan, isPrsLoading, isCommitsLoading, isIssuesLoading]);

  const withLoading = (element: JSX.Element, isDoneLoading: boolean) => (
    <>
      {(!isDoneLoading && (
        <Container>
          <div className={classNames(styles.vert_centre)}>
            <Spinner name="ball-scale-multiple" />
          </div>
        </Container>
      )) ||
        element}
    </>
  );

  return (
    <>
      <TopNavBar />
      <Tabs defaultActiveKey="overview" id="repo-tabs">
        <Tab eventKey="repo" title={`${author}/${name}`} disabled />

        <Tab eventKey="overview" title="Overview">
          {withLoading(
            <OverviewPage
              issuesOpened={issuesOpened}
              issuesClosed={issuesClosed}
              prsOpened={prsOpened}
              prsMerged={prsMerged}
              commitsMade={commitsMade}
              linesAdded={linesAdded}
              linesDeleted={linesDeleted}
            />,
            doneLoading
          )}
        </Tab>

        <Tab eventKey="issues" title="Issues">
          {withLoading(
            <IssuesPage
              issues={issues}
              issuesClosed={issuesClosed}
              issuesOpened={issuesOpened}
            />,
            doneLoading
          )}
        </Tab>

        <Tab eventKey="prs" title="Pull Requests">
          {withLoading(
            <PullRequestPage
              prs={prs}
              prsMerged={prsMerged}
              prsOpened={prsOpened}
            />,
            doneLoading
          )}
        </Tab>

        <Tab eventKey="commits" title="Commits">
          {withLoading(
            <CommitsPage
              commits={commits}
              commitsMade={commitsMade}
              linesAdded={linesAdded}
              linesDeleted={linesDeleted}
            />,
            doneLoading
          )}
        </Tab>
      </Tabs>
    </>
  );
};

const mapStateToProps = (state: AppState): IStateProps => {
  const {
    currentRepository,
    commitInfo,
    pullRequestInfo,
    issueInfo,
    timeSpan,
    loadingStatus
  } = state.repositoryInfo;

  const { isPrsLoading, isCommitsLoading, isIssuesLoading } = loadingStatus;
  return {
    isPrsLoading,
    isCommitsLoading,
    isIssuesLoading,
    timeSpan,
    repo: currentRepository,
    prs: pullRequestInfo,
    commits: commitInfo,
    issues: issueInfo
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  getPullRequests: (repository: IRepository) => {
    dispatch(getPullRequestInfoAction(repository));
  },
  getIssues: (repository: IRepository) => {
    dispatch(getIssueInfoAction(repository));
  },
  getCommits: (repository: IRepository) => {
    dispatch(getCommitInfoAction(repository));
  },
  setPrsLoading: () => {
    dispatch(setPrsLoadingStatusAction(true));
  },
  setCommitsLoading: () => {
    dispatch(setCommitsLoadingStatusAction(true));
  },
  setIssuesLoading: () => {
    dispatch(setIssuesLoadingStatusAction(true));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RepoInfoPage)
);
