import { combineReducers } from "redux";
import authReducer from "./auth";
import newsReducer from "./news";
import keywordReducer from "./keyword";
import visitedReducer from "./visited";
import currentUserReducer from "./currentUser";
export default combineReducers({
  authReducer,
  currentUserReducer,
  newsReducer,
  keywordReducer,
  visitedReducer,
});
