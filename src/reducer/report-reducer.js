import {
  REPORT_FAIL,
  REPORT_REQUEST,
  REPORT_SUCCESS,
} from "../constants/report-constant";

export const reportReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case REPORT_REQUEST:
      return { loading: true };
    case REPORT_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case REPORT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
