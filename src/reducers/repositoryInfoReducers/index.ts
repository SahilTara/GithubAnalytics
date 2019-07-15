import currentRepository from "./currentRepositoryReducer";
import pullRequestInfo from "./pullRequestInfoReducer";
import { combineReducers } from "redux";

const repositoryInfoReducer = combineReducers({
  pullRequestInfo,
  currentRepository
});

export default repositoryInfoReducer;
