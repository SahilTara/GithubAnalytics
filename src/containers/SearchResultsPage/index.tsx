import React from "react";
import IRepository from "../../types/IRespository";
import { Row, Container, Col } from "react-bootstrap";
import SearchBar from "../../components/SearchBar";
import RepositoryCard from "../../components/RepositoryCard";
import { RouteComponentProps, withRouter } from "react-router";
import { AppState } from "../../reducers";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../actions";
import { setCurrentRepositoryAction } from "../../actions/repositoryInfoActions/setCurrentRepository";
import { getRepositoriesFromSearchAction } from "../../actions/searchInfoActions/searchQueryRepositories";
import { setSearchInProgressStatusAction } from "../../actions/searchInfoActions/isSearchInProgress";
import { connect } from "react-redux";
import styles from "./styles.module.css";
import classNames from "classnames";
import { setQueryTextAction } from "../../actions/searchInfoActions/lastQueryText";
import TopNavBar from "../../components/TopNavBar";
const Spinner = require("react-spinkit");

interface IProps extends RouteComponentProps {}

interface IStateProps {
  repos: IRepository[];
  textToSearch: string;
  searchInProgress: boolean;
}

interface IDispatchProps {
  setCurrentRepo: (repository: IRepository) => any;
  setQueryText: (query: string) => any;
  performSearch: (query: string) => any;
  setIsSearching: () => any;
}

type Props = IProps & IStateProps & IDispatchProps;

/**
 * Page that displays search query results.
 */
const SearchResultsPage: React.FC<Props> = ({
  history,
  repos,
  textToSearch,
  performSearch,
  setQueryText,
  setCurrentRepo,
  searchInProgress,
  setIsSearching
}) => {
  // Nothing was searched before reaching.
  if (textToSearch === "") {
    history.push("/");
  }

  const handleSearch = (query: string) => {
    setIsSearching();
    setQueryText(query);
    performSearch(query);
  };

  const onClick = (repository: IRepository) => {
    setCurrentRepo(repository);
    history.push("/repo");
  };

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
      <Container>
        {withLoading(
          <div>
            <Row>
              <Col md={{ span: 6, offset: 3 }}>
                <SearchBar
                  searchHandler={handleSearch}
                  initialValue={textToSearch}
                />
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 10, offset: 2 }}>
                <Row>
                  {repos.map(repo => {
                    return (
                      <Col md={5} style={{ marginTop: "20px" }}>
                        <RepositoryCard
                          info={repo}
                          onClick={onClick}
                          style={{ padding: "20px" }}
                        />
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Row>
          </div>,
          !searchInProgress
        )}
      </Container>
    </>
  );
};

const mapStateToProps = (state: AppState): IStateProps => {
  const {
    lastQueryText,
    searchQueryRepositories,
    isSearchInProgress
  } = state.searchInfo;
  return {
    repos: searchQueryRepositories,
    searchInProgress: isSearchInProgress,
    textToSearch: lastQueryText
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  setCurrentRepo: (repository: IRepository) => {
    dispatch(setCurrentRepositoryAction(repository));
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
  )(SearchResultsPage)
);
