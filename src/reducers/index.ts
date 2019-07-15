import { combineReducers } from "redux";
import dashboardInfo from "./dashboardInfoReducers";
import repositoryInfo from "./repositoryInfoReducers";

const rootReducer = combineReducers({ dashboardInfo, repositoryInfo });

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
