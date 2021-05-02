import {
  CONTACT_LIST_FAIL,
  CONTACT_LIST_REQUEST,
  CONTACT_LIST_SUCCESS,
} from "../constants/contactConstants";
import axios from "axios";
const url = "http://localhost:5000/visitors";

export const listContacts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CONTACT_LIST_REQUEST });
    const {
      adminLogin: { adminInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };
    const { data } = await axios.get(url, config);
    dispatch({ type: CONTACT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONTACT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
