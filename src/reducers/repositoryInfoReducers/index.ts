import currentRepository from "./currentRepositoryReducer";
import pullRequestInfo from "./pullRequestInfoReducer";
import issueInfo from "./issueInfoReducer";
import commitInfo from "./commitInfoReducer";

import { combineReducers } from "redux";

const repositoryInfoReducer = combineReducers({
  pullRequestInfo,
  issueInfo,
  commitInfo,
  currentRepository
});

export default repositoryInfoReducer;
