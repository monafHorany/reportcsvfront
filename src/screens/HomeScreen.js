import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const HomeScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error } = userLogin;

  const [selectedFromDate, setSelectedFromDate] = useState(
    new Date().toLocaleDateString()
  );
  const [selectedToDate, setSelectedToDate] = useState(
    new Date().toLocaleDateString()
  );
  // const handleFromDateChange = (date) => {
  //   setSelectedFromDate(date);
  //   setTimeout(() => {
  //   }, 2000);
  // };
  console.log("from ", selectedFromDate);
  // const handleToDateChange = (date) => {
  //   setSelectedToDate(date);
  // };
  console.log("to ", selectedToDate);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

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
                    format="dd/MM/yyyy"
                    value={selectedFromDate}
                    maxDate={new Date().toLocaleString()}
                    onChange={(date) =>
                      setSelectedFromDate(new Date(date).toLocaleDateString())
                    }
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
                    format="dd/MM/yyyy"
                    value={selectedToDate}
                    maxDate={new Date().toISOString()}
                    onChange={(date) =>
                      setSelectedToDate(new Date(date).toLocaleDateString())
                    }
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </React.Fragment>
    );
  }
};

export default HomeScreen;
