import {
  PRODUCT_PRICE_REQUEST,
  PRODUCT_PRICE_SUCCESS,
  PRODUCT_PRICE_FAIL,
} from "../constants/prices";
export const changePriceReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case PRODUCT_PRICE_REQUEST:
      return { loading: true };
    case PRODUCT_PRICE_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case PRODUCT_PRICE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
