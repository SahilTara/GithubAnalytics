import React, { useEffect } from "react";
import IRepository from "../../types/IRespository";

import { Container, Row, Col } from "react-bootstrap";
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
import SearchBar from "../../components/SearchBar";
import { getRepositoriesFromSearchAction } from "../../actions/searchInfoActions/searchQueryRepositories";
import { setSearchInProgressStatusAction } from "../../actions/searchInfoActions/isSearchInProgress";
import { setQueryTextAction } from "../../actions/searchInfoActions/lastQueryText";

interface IProps extends RouteComponentProps {}
interface IStateProps {
  popularRepos: IRepository[];
  userRepos: IRepository[];
  isLoggedIn: boolean;
}

interface IDispatchProps {
  setCurrentRepo: (repository: IRepository) => any;
  getPopularRepos: () => any;
  performSearch: (query: string) => any;
  setIsSearching: () => any;
  getUserRepos: () => any;
  setQueryText: (query: string) => any;
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
    isLoggedIn,
    performSearch,
    setIsSearching,
    setQueryText
  } = props;

  const onClick = (repository: IRepository) => {
    setCurrentRepo(repository);
    history.push("/repo");
  };
  useEffect(() => {
    if (isLoggedIn) {
      getUserRepos();
      getPopularRepos();
    }
  }, [isLoggedIn]);

  const handleSearch = (query: string) => {
    history.push("/search");
    setIsSearching();
    setQueryText(query);
    performSearch(query);
  };

  return (
    <Container>
      {(!isLoggedIn && <LoginPage />) || (
        <div>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <SearchBar searchHandler={handleSearch} />
            </Col>
          </Row>

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
  },
  performSearch: (query: string) => {
    dispatch(getRepositoriesFromSearchAction(query));
  },
  setQueryText: (query: string) => {
    dispatch(setQueryTextAction(query));
  },
  setIsSearching: () => {
    dispatch(setSearchInProgressStatusAction(true));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
