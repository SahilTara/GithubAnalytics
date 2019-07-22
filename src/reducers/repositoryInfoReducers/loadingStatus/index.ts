import { combineReducers } from "redux";
import isIssuesLoading from "./isIssuesLoadingReducer";
import isCommitsLoading from "./isCommitsLoadingReducer";
import isPrsLoading from "./isPrsLoadingReducer";

/**
 * Loading Status Root Reducer
 */
const loadingStatusReducer = combineReducers({
  isIssuesLoading,
  isCommitsLoading,
  isPrsLoading
});

export default loadingStatusReducer;
