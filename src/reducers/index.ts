import { combineReducers } from "redux";
import dashboardInfo from "./dashboardInfoReducers";
import repositoryInfo from "./repositoryInfoReducers";
import environmentInfo from "./environmentInfoReducers";
import searchInfo from "./searchInfoReducers";

/**
 * Application Wide Root Reducer
 */
const rootReducer = combineReducers({
  dashboardInfo,
  searchInfo,
  repositoryInfo,
  environmentInfo
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
