import {
  FAQ_LIST_FAIL,
  FAQ_LIST_REQUEST,
  FAQ_LIST_SUCCESS,
} from "../constants/faqConstants";

export const faqListReducer = (state = { faqs: [] }, action) => {
  switch (action.type) {
    case FAQ_LIST_REQUEST:
      return { loading: true, faqs: [] };
    case FAQ_LIST_SUCCESS:
      return { loading: false, faqs: action.payload };
    case FAQ_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
