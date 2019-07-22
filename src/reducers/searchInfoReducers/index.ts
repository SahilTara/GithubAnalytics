import { combineReducers } from "redux";
import searchQueryRepositories from "./searchQueryRepositoryReducer";
import isSearchInProgress from "./isSearchInProgressReducer";
import lastQueryText from "./lastQueryTextReducer";

/**
 * Search Info Root Reducer
 */
const searchInfoReducer = combineReducers({
  searchQueryRepositories,
  lastQueryText,
  isSearchInProgress
});

export default searchInfoReducer;
