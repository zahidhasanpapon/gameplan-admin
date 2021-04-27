import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  reviewListReducer,
  reviewDetailsReducer,
} from "./reducers/reviewReducers";
import {
  adminDetailsReducer,
  adminLoginReducer,
  adminRegisternReducer,
  adminUpdateProfileReducer,
} from "./reducers/adminReducers";

const reducer = combineReducers({
  reviewList: reviewListReducer,
  reviewDetails: reviewDetailsReducer,
  adminLogin: adminLoginReducer,
  adminRegister: adminRegisternReducer,
  adminDetails: adminDetailsReducer,
  adminUpdateProfile: adminUpdateProfileReducer,
});

const adminInfoFromStorage = localStorage.getItem("adminInfo")
  ? JSON.parse(localStorage.getItem("adminInfo"))
  : null;

const initialState = {
  adminLogin: { adminInfo: adminInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
