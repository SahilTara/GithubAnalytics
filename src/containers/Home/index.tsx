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

interface IProps extends RouteComponentProps {}
interface IStateProps {
  popularRepos: IRepository[];
  isLoggedIn: boolean;
}

interface IDispatchProps {
  setCurrentRepo: (repository: IRepository) => any;
  getPopularRepos: () => any;
}

type Props = IStateProps & IDispatchProps & IProps;
const Home: React.FC<Props> = props => {
  const {
    popularRepos,
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
      getPopularRepos();
    }
  }, [isLoggedIn]);
  return (
    <Container>
      {(!isLoggedIn && <LoginPage />) || (
        <div>
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
  const { popularRepos } = state.dashboardInfo;
  const { isLoggedIn } = state.environmentInfo;
  return {
    popularRepos,
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
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
