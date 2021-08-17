import {
  SALE_REPORT_REQUEST,
  SALE_REPORT_SUCCESS,
  SALE_REPORT_FAIL,
  REFUND_REPORT_REQUEST,
  REFUND_REPORT_SUCCESS,
  REFUND_REPORT_FAIL,
  SHIPPED_REPORT_REQUEST,
  SHIPPED_REPORT_SUCCESS,
  SHIPPED_REPORT_FAIL,
} from "../constants/report-constant";

export const saleReportReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case SALE_REPORT_REQUEST:
      return { loading: true };
    case SALE_REPORT_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case SALE_REPORT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const refundReportReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case REFUND_REPORT_REQUEST:
      return { loading: true };
    case REFUND_REPORT_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case REFUND_REPORT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const shippedReportReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case SHIPPED_REPORT_REQUEST:
      return { loading: true };
    case SHIPPED_REPORT_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case SHIPPED_REPORT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
