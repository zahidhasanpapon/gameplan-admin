import axios from "axios";
import {
  FAQ_LIST_FAIL,
  FAQ_LIST_REQUEST,
  FAQ_LIST_SUCCESS,
} from "../constants/faqConstants";
const url = "http://localhost:5000/faqs";

export const listFaqs = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FAQ_LIST_REQUEST });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.get(url, config);

    dispatch({ type: FAQ_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FAQ_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
