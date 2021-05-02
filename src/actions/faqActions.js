import axios from "axios";
import {
  FAQ_CREATE_FAIL,
  FAQ_CREATE_REQUEST,
  FAQ_CREATE_SUCCESS,
  FAQ_DELETE_FAIL,
  FAQ_DELETE_REQUEST,
  FAQ_DELETE_SUCCESS,
  FAQ_DETAILS_FAIL,
  FAQ_DETAILS_REQUEST,
  FAQ_DETAILS_SUCCESS,
  FAQ_LIST_FAIL,
  FAQ_LIST_REQUEST,
  FAQ_LIST_SUCCESS,
  FAQ_UPDATE_FAIL,
  FAQ_UPDATE_REQUEST,
  FAQ_UPDATE_SUCCESS,
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

export const createFaq = (question, answer) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FAQ_CREATE_REQUEST,
    });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.post(url, { question, answer }, config);

    dispatch({
      type: FAQ_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAQ_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteFaq = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FAQ_DELETE_REQUEST,
    });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.delete(`${url}/${id}`, config);

    dispatch({
      type: FAQ_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAQ_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateFaq = (faq) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FAQ_UPDATE_REQUEST,
    });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.delete(`${url}/${faq._id}`, config);

    dispatch({
      type: FAQ_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAQ_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getFaqDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FAQ_DETAILS_REQUEST,
    });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.get(`${url}/${id}`, config);

    dispatch({
      type: FAQ_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAQ_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
