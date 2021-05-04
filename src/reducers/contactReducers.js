import {
  CONTACT_DELETE_FAIL,
  CONTACT_DELETE_REQUEST,
  CONTACT_DELETE_SUCCESS,
  CONTACT_LIST_FAIL,
  CONTACT_LIST_REQUEST,
  CONTACT_LIST_SUCCESS,
} from "../constants/contactConstants";

export const contactListReducer = (state = { contacts: [] }, action) => {
  switch (action.type) {
    case CONTACT_LIST_REQUEST:
      return { loading: true, contacts: [] };
    case CONTACT_LIST_SUCCESS:
      return { loading: false, contacts: action.payload };
    case CONTACT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const contactDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTACT_DELETE_REQUEST:
      return { loading: true };
    case CONTACT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CONTACT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
