import { combineReducers } from "redux";
import popularRepos from "./popularRepositoryReducer";
import userRepos from "./userRepositoryReducer";

const dashboardInfoReducer = combineReducers({
  userRepos,
  popularRepos
});

export default dashboardInfoReducer;
