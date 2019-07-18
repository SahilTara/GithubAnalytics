import { combineReducers } from "redux";
import searchQueryRepositories from "./searchQueryRepositoryReducer";
import isSearchInProgress from "./isSearchInProgressReducer";
import lastQueryText from "./lastQueryTextReducer";
const searchInfoReducer = combineReducers({
  searchQueryRepositories,
  lastQueryText,
  isSearchInProgress
});

export default searchInfoReducer;
