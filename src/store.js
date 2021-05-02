import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  reviewListReducer,
  reviewDetailsReducer,
  reviewDeleteReducer,
  reviewCreateReducer,
  reviewUpdatReducer,
} from "./reducers/reviewReducers";
import {
  adminDeleteReducer,
  adminDetailsReducer,
  adminListReducer,
  adminLoginReducer,
  adminRegisternReducer,
  adminUpdateProfileReducer,
  adminUpdateReducer,
} from "./reducers/adminReducers";
import {
  faqCreateReducer,
  faqDeleteReducer,
  faqListReducer,
} from "./reducers/faqReducers";
import { phoneListReducer } from "./reducers/phoneReducers";

const reducer = combineReducers({
  reviewList: reviewListReducer,
  reviewDetails: reviewDetailsReducer,
  adminLogin: adminLoginReducer,
  adminRegister: adminRegisternReducer,
  adminDetails: adminDetailsReducer,
  adminUpdateProfile: adminUpdateProfileReducer,
  adminList: adminListReducer,
  adminDelete: adminDeleteReducer,
  adminUpdate: adminUpdateReducer,
  reviewDelete: reviewDeleteReducer,
  reviewCreate: reviewCreateReducer,
  reviewUpdate: reviewUpdatReducer,
  faqList: faqListReducer,
  faqCreate: faqCreateReducer,
  faqDelete: faqDeleteReducer,
  phoneList: phoneListReducer,
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
