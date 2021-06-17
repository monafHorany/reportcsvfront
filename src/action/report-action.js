import axios from "axios";
import {
  REPORT_FAIL,
  REPORT_REQUEST,
  REPORT_SUCCESS,
} from "../constants/report-constant";
import { logout } from "./user-action";

export const getReport = (from, to) => async (dispatch) => {
  try {
    dispatch({
      type: REPORT_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "order/fetchAllOrderFromWoocommerce",
      { from, to },
      config
    );
    if (data) {
      window.location = `${process.env.REACT_APP_BACKEND_URL}order/download`;
    }
    dispatch({
      type: REPORT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REPORT_FAIL,
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
