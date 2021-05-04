import {
  PHONE_DELETE_FAIL,
  PHONE_DELETE_REQUEST,
  PHONE_DELETE_SUCCESS,
  PHONE_LIST_FAIL,
  PHONE_LIST_REQUEST,
  PHONE_LIST_SUCCESS,
} from "../constants/phoneConstants";

export const phoneListReducer = (state = { phones: [] }, action) => {
  switch (action.type) {
    case PHONE_LIST_REQUEST:
      return { loading: true, phones: [] };
    case PHONE_LIST_SUCCESS:
      return { loading: false, phones: action.payload };
    case PHONE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const phoneDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PHONE_DELETE_REQUEST:
      return { loading: true };
    case PHONE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PHONE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
