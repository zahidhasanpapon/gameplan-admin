import {
  PHONE_DELETE_FAIL,
  PHONE_DELETE_REQUEST,
  PHONE_DELETE_SUCCESS,
  PHONE_LIST_FAIL,
  PHONE_LIST_REQUEST,
  PHONE_LIST_SUCCESS,
} from "../constants/phoneConstants";
import axios from "axios";
const url = "http://localhost:5000/link";

export const listPhones = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PHONE_LIST_REQUEST });
    const {
      adminLogin: { adminInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };
    const { data } = await axios.get(url, config);
    dispatch({ type: PHONE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PHONE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePhone = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PHONE_DELETE_REQUEST });
    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    await axios.delete(`${url}/${id}`, config);
    dispatch({
      type: PHONE_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PHONE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
