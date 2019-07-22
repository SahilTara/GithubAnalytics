import { combineReducers } from "redux";
import popularRepos from "./popularRepositoryReducer";
import userRepos from "./userRepositoryReducer";

/**
 * Dashboard root reducer
 */
const dashboardInfoReducer = combineReducers({
  userRepos,
  popularRepos
});

export default dashboardInfoReducer;
