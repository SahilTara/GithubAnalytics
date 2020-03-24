import { combineReducers } from "redux";
import isLoggedIn from "./loginStatusReducer";

/**
 * Environment Info Root Reducer
 */
const environmentInfoReducer = combineReducers({
  isLoggedIn
});

export default environmentInfoReducer;
