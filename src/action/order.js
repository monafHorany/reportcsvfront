import axios from "axios";
import {
  ORDER_STATUS_REQUEST,
  ORDER_STATUS_SUCCESS,
  ORDER_STATUS_FAIL,
} from "../constants/order";
import { logout } from "./user-action";

export const changeStatus = (ids) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_STATUS_REQUEST,
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
      process.env.REACT_APP_BACKEND_URL + "order/statusHandler",
      { ids },
      config
    );

    dispatch({
      type: ORDER_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_STATUS_FAIL,
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
