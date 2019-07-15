import { combineReducers } from "redux";
import popularRepos from "./popularRepositoryReducer";

const dashboardInfoReducer = combineReducers({
  popularRepos
});

export default dashboardInfoReducer;
