import {
  PHONE_LIST_FAIL,
  PHONE_LIST_REQUEST,
  PHONE_LIST_SUCCESS,
} from "../constants/phoneConstants";

export const phoneListReducer = (state = { phones: [] }, action) => {
  switch (action.type) {
    case PHONE_LIST_REQUEST:
      return { loading: true, phones: [] };
    case PHONE_LIST_SUCCESS:
      return { loading: false, faqs: action.payload };
    case PHONE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
