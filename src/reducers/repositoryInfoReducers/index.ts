import currentRepository from "./currentRepositoryReducer";
import pullRequestInfo from "./pullRequestInfoReducer";
import issueInfo from "./issueInfoReducer";
import commitInfo from "./commitInfoReducer";
import timeSpan from "./timeSpanReducer";
import loadingStatus from "./loadingStatus";

import { combineReducers } from "redux";

const repositoryInfoReducer = combineReducers({
  pullRequestInfo,
  issueInfo,
  commitInfo,
  timeSpan,
  loadingStatus,
  currentRepository
});

export default repositoryInfoReducer;
