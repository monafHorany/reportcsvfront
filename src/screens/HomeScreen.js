import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import DateFnsUtils from "@date-io/date-fns";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Button } from "@material-ui/core";
import { getReport } from "../action/report-action";
import { changeStatus } from "../action/order";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const HomeScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const reportReducer = useSelector((state) => state.report);
  const { loading, error } = reportReducer;
  const statusReducer = useSelector((state) => state.status);
  const {
    loading: statusloading,
    success: statusSuccess,
    error: statusError,
  } = statusReducer;
  console.log(statusloading, statusSuccess, statusError);
  const [selectedFromDate, setSelectedFromDate] = useState(new Date());
  const [selectedToDate, setSelectedToDate] = useState(new Date());

  const [ids, setIds] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  // const handleClick = () => {
  //   setOpen(true);
  // };
  console.log(selectedFromDate);
  console.log(selectedToDate);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (statusSuccess) {
      setOpen(true);
    }
  }, [history, statusSuccess, userInfo]);

  if (userInfo && userInfo.role === "accountant") {
    return (
      <React.Fragment>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container style={{ marginTop: "10%" }}>
            <Grid item sm={12} md={12} lg={12} xl={12}>
              <Grid container justify="center" spacing={2}>
                <Grid item>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="From Date"
                    format="yyyy-MM-dd"
                    value={selectedFromDate}
                    maxDate={new Date().toLocaleString()}
                    onChange={(date) => setSelectedFromDate(date)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
                <Grid item>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="To Data (not included)"
                    format="yyyy-MM-dd"
                    value={selectedToDate}
                    maxDate={new Date().toISOString()}
                    onChange={(date) => setSelectedToDate(date)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    dispatch(getReport(selectedFromDate, selectedToDate))
                  }
                  disabled={loading}
                >
                  export Csv
                </Button>
                {error && <div>{error}</div>}
              </Grid>
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </React.Fragment>
    );
  } else if (userInfo && userInfo.role === "ordermanager") {
    return (
      <React.Fragment>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container style={{ marginTop: "10%" }}>
            <Grid item sm={12} md={12} lg={12} xl={12}>
              <Grid container justify="center" spacing={3}>
                <Grid item>
                  <TextareaAutosize
                    rowsMin={5}
                    cols={40}
                    value={ids}
                    onChange={(e) => setIds(e.target.value)}
                    placeholder="Paste Id's"
                  />
                  {/* </Grid>
                <Grid item> */}
                  <Button
                    size="small"
                    style={{ width: "71%" }}
                    variant="contained"
                    color="primary"
                    onClick={() => dispatch(changeStatus(ids))}
                    disabled={loading}
                  >
                    change status{" "}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>

        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            done!{" "}
          </Alert>
        </Snackbar>
      </React.Fragment>
    );
  } else {
    return <h5>please login</h5>;
  }
};

export default HomeScreen;
