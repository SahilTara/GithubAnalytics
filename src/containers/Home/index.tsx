import React, { useEffect } from "react";
import IRepository from "../../types/IRespository";

import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import RepositoryCard from "../../components/RepositoryCard";
import Redux from "redux";
import { getPopularRepositoriesAction } from "../../actions/dashboardInfoActions/getPopularRepositories";
import { AppState } from "../../reducers";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../actions";
import HorizontalScroller from "../../components/HorizontalScroller";

interface IStateProps {
  popularRepos: IRepository[];
}

interface IDispatchProps {
  getPopularRepos: () => any;
}

type Props = IStateProps & IDispatchProps;
const Home: React.FC<Props> = props => {
  const { popularRepos, getPopularRepos } = props;

  useEffect(() => {
    getPopularRepos();
    console.log("Test");
  }, []);
  return (
    <Container>
      <div>
        <HorizontalScroller title={"Explore popular repositories"} cards={popularRepos}></HorizontalScroller>
      </div>
    </Container>
  );
};

const mapStateToProps = (state: any): IStateProps => {
  const { popularRepos } = state.dashboardInfo;
  return {
    popularRepos
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  getPopularRepos: () => {
    dispatch(getPopularRepositoriesAction());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
