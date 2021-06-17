import {
  ORDER_STATUS_REQUEST,
  ORDER_STATUS_SUCCESS,
  ORDER_STATUS_FAIL,
} from "../constants/order";
export const changeStatusReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case ORDER_STATUS_REQUEST:
      return { loading: true };
    case ORDER_STATUS_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case ORDER_STATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
