import axios from "axios";
import {
  PRODUCT_PRICE_REQUEST,
  PRODUCT_PRICE_SUCCESS,
  PRODUCT_PRICE_FAIL,
} from "../constants/prices";
import { logout } from "./user-action";

export const changePrice = (ids, prices) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_PRICE_REQUEST,
    });

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "order/priceHandler",
      { ids, prices },
      config
    );

    dispatch({
      type: PRODUCT_PRICE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_PRICE_FAIL,
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
