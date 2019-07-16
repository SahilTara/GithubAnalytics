import { combineReducers } from "redux";
import dashboardInfo from "./dashboardInfoReducers";
import repositoryInfo from "./repositoryInfoReducers";
import environmentInfo from "./environmentInfoReducers";

const rootReducer = combineReducers({
  dashboardInfo,
  repositoryInfo,
  environmentInfo
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
