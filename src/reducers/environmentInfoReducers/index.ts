import { combineReducers } from "redux";
import isLoggedIn from "./loginStatusReducer";

const environmentInfoReducer = combineReducers({
  isLoggedIn
});

export default environmentInfoReducer;
