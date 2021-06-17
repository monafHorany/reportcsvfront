import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer } from "./reducer/userReducers";
import { reportReducer } from "./reducer/report-reducer";
import { changeStatusReducer } from "./reducer/order";

const middleware = [thunk];

const reducer = combineReducers({
  userLogin: userLoginReducer,
  report: reportReducer,
  status: changeStatusReducer,
});

const userInfoFromStorage = localStorage.getItem("orjeenUserLoginInfo")
  ? JSON.parse(localStorage.getItem("orjeenUserLoginInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
