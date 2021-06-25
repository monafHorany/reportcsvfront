import axios from "axios";
import {
  SALE_REPORT_REQUEST,
  SALE_REPORT_SUCCESS,
  SALE_REPORT_FAIL,
  REFUND_REPORT_REQUEST,
  REFUND_REPORT_SUCCESS,
  REFUND_REPORT_FAIL,
} from "../constants/report-constant";
import { logout } from "./user-action";

export const getSaleReport = (from, to) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SALE_REPORT_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "order/fetchAllOrderFromWoocommerce",
      { from, to },
      config
    );
    if (data) {
      window.location = `${process.env.REACT_APP_BACKEND_URL}order/saleDownload`;
    }
    dispatch({
      type: SALE_REPORT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SALE_REPORT_FAIL,
      payload: error.response.data,
    });
    if (
      error.response.data === "Not authorized, token failed, Logging you out" ||
      error.response.data === "Not authorized, no token, Logging you out" ||
      error.response.data === "Not authorized as an admin, Logging you out" ||
      error.response.data === "Not authorized as an editor, Logging you out"
    ) {
      setTimeout(() => {
        dispatch(logout());
      }, 3000);
    }
  }
};
export const getRefundReport = (from, to) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REFUND_REPORT_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      process.env.REACT_APP_BACKEND_URL +
        "order/fetchAllRefundOrderFromWoocommerce",
      { from, to },
      config
    );
    if (data) {
      window.location = `${process.env.REACT_APP_BACKEND_URL}order/refundDownload`;
    }
    dispatch({
      type: REFUND_REPORT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REFUND_REPORT_FAIL,
      payload: error.response.data,
    });
    if (
      error.response.data === "Not authorized, token failed, Logging you out" ||
      error.response.data === "Not authorized, no token, Logging you out" ||
      error.response.data === "Not authorized as an admin, Logging you out" ||
      error.response.data === "Not authorized as an editor, Logging you out"
    ) {
      setTimeout(() => {
        dispatch(logout());
      }, 3000);
    }
  }
};
