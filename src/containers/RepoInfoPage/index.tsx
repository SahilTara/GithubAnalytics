import React, { useEffect } from "react";
import IRepository from "../../types/IRespository";
import { Tabs, Tab } from "react-bootstrap";
import { AppState } from "../../reducers";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../actions";
import { getPullRequestInfoAction } from "../../actions/repositoryInfoActions/pullRequestInfo";

interface IProps extends RouteComponentProps {}
interface IStateProps {
  repo: IRepository;
}
interface IDispatchProps {
  getPullRequests: (repository: IRepository) => any;
}

type Props = IStateProps & IProps & IDispatchProps;

const RepoInfoPage: React.FC<Props> = props => {
  const { history, repo, getPullRequests } = props;
  const { name, author } = repo;

  useEffect(() => {
    if (repo) {
      getPullRequests(repo);
    }
  }, [repo]);
  // Repo wasn't filled before reaching.
  if (name === "") {
    history.push("/");
  }

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
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RepoInfoPage)
);
