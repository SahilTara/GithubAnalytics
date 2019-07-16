import React, { useEffect } from "react";
import IRepository from "../../types/IRespository";
import { Tabs, Tab } from "react-bootstrap";
import { AppState } from "../../reducers";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../actions";
import { getPullRequestInfoAction } from "../../actions/repositoryInfoActions/pullRequestInfo";
import { getIssueInfoAction } from "../../actions/repositoryInfoActions/issueInfo";
import { getCommitInfoAction } from "../../actions/repositoryInfoActions/commitInfo";

interface IProps extends RouteComponentProps {}
interface IStateProps {
  repo: IRepository;
}
interface IDispatchProps {
  getPullRequests: (repository: IRepository) => any;
  getIssues: (repository: IRepository) => any;
  getCommits: (repository: IRepository) => any;
}

type Props = IStateProps & IProps & IDispatchProps;

const RepoInfoPage: React.FC<Props> = props => {
  const { history, repo, getPullRequests, getIssues, getCommits } = props;
  const { name, author } = repo;

  // Repo wasn't filled before reaching.
  if (name === "") {
    history.push("/");
  }

  useEffect(() => {
    if (repo.name) {
      getPullRequests(repo);
      getIssues(repo);
      getCommits(repo);
    }
  }, [repo.name]);

  return (
    <Tabs defaultActiveKey="overview" id="repo-tabs">
      <Tab eventKey="repo" title={`${author}/${name}`} disabled />

      <Tab eventKey="overview" title="Overview" />
    </Tabs>
  );
};

const mapStateToProps = (state: AppState): IStateProps => {
  const { currentRepository } = state.repositoryInfo;
  return {
    repo: currentRepository
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
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RepoInfoPage)
);
