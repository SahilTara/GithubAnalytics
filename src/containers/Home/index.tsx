import React, { useEffect } from "react";
import IRepository from "../../types/IRespository";

import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { getPopularRepositoriesAction } from "../../actions/dashboardInfoActions/getPopularRepositories";
import { AppState } from "../../reducers";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../actions";
import HorizontalScroller from "../../components/HorizontalScroller";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { setCurrentRepositoryAction } from "../../actions/repositoryInfoActions/setCurrentRepository";
import LoginPage from "../LoginPage";
import { getUserRepositoriesAction } from "../../actions/dashboardInfoActions/getUserRepositories";

interface IProps extends RouteComponentProps {}
interface IStateProps {
  popularRepos: IRepository[];
  userRepos: IRepository[];
  isLoggedIn: boolean;
}

interface IDispatchProps {
  setCurrentRepo: (repository: IRepository) => any;
  getPopularRepos: () => any;
  getUserRepos: () => any;
}

type Props = IStateProps & IDispatchProps & IProps;
const Home: React.FC<Props> = props => {
  const {
    popularRepos,
    userRepos,
    getUserRepos,
    getPopularRepos,
    history,
    setCurrentRepo,
    isLoggedIn
  } = props;

  const onClick = (repository: IRepository) => {
    setCurrentRepo(repository);
    history.push("/repo");
  };
  console.log(isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      getUserRepos();
      getPopularRepos();
    }
  }, [isLoggedIn]);
  return (
    <Container>
      {(!isLoggedIn && <LoginPage />) || (
        <div>
          {userRepos.length > 0 && (
            <HorizontalScroller
              title={"Your Repositories"}
              repos={userRepos}
              onClick={onClick}
            />
          )}
          <HorizontalScroller
            title={"Explore popular repositories"}
            repos={popularRepos}
            onClick={onClick}
          />
        </div>
      )}
    </Container>
  );
};

const mapStateToProps = (state: AppState): IStateProps => {
  const { popularRepos, userRepos } = state.dashboardInfo;
  const { isLoggedIn } = state.environmentInfo;
  return {
    popularRepos,
    userRepos,
    isLoggedIn
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  setCurrentRepo: (repository: IRepository) => {
    dispatch(setCurrentRepositoryAction(repository));
  },
  getPopularRepos: () => {
    dispatch(getPopularRepositoriesAction());
  },
  getUserRepos: () => {
    dispatch(getUserRepositoriesAction());
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
