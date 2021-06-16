import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants/userConstants";
import axios from "axios";

export const logout = () => (dispatch) => {
  localStorage.removeItem("orjeenUserInfo");
  dispatch({ type: USER_LOGOUT });

  document.location.href = "/login";
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "user/login",
      { email, password },
      config
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("orjeenUserInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
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
