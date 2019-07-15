import { combineReducers } from "redux";
import dashboardInfo from "./dashboardInfoReducers";

const rootReducer = combineReducers({ dashboardInfo });

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
