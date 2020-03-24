import { combineReducers } from "redux";
import popularRepos from "./popularRepositoryReducer";
import userRepos from "./userRepositoryReducer";

/**
 * Environment Info Root Reducer
 */
const dashboardInfoReducer = combineReducers({
  userRepos,
  popularRepos
});

export default dashboardInfoReducer;
