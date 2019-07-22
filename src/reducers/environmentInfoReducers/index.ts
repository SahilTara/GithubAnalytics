import { combineReducers } from "redux";
import isLoggedIn from "./loginStatusReducer";

/**
 * Environment Info root reducer
 */
const environmentInfoReducer = combineReducers({
  isLoggedIn
});

export default environmentInfoReducer;
