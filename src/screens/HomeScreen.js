import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import DateFnsUtils from "@date-io/date-fns";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Button } from "@material-ui/core";
import { getRefundReport, getSaleReport } from "../action/report-action";
import { changeStatus } from "../action/order";
import { changePrice } from "../action/price";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const HomeScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const saleReportReducer = useSelector((state) => state.saleReport);
  const { loading, error } = saleReportReducer;
  const refundReportReducer = useSelector((state) => state.refundReport);
  const { loading: refundLoading, error: refundError } = refundReportReducer;
  const statusReducer = useSelector((state) => state.status);
  const {
    loading: statusloading,
    success: statusSuccess,
    error: statusError,
  } = statusReducer;
  console.log(statusloading, statusSuccess, statusError);
  const [selectedSaleFromDate, setSelectedSaleFromDate] = useState(new Date());
  const [selectedSaleToDate, setSelectedSaleToDate] = useState(new Date());

  const [selectedRefundFromDate, setSelectedRefundFromDate] = useState(
    new Date()
  );
  const [selectedRefundToDate, setSelectedRefundToDate] = useState(new Date());

  const [ids, setIds] = useState("");
  const [status, setStatus] = useState("completed");
  const [productIds, setproductIds] = useState("");
  const [prices, setPrices] = useState("");
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [openBackDrop, setOpenBackDrop] = useState(false);

  const dispatch = useDispatch();
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
      setOpenBackDrop(false);
      setIds("");
    }
  }, [history, statusSuccess, userInfo]);

  if (userInfo && userInfo.role === "accountant") {
    return (
      <React.Fragment>
        <header
          style={{
            position: "sticky",
            textAlign: "center",
            backgroundColor: "#303F9F",
            color: "#FFF",
            padding: "1vw",
            fontFamily: "cursive",
            fontSize: "1.1vw",
          }}
        >
          Produced By <em>ŞAHİN HORANY</em>
        </header>
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
                    value={selectedSaleFromDate}
                    maxDate={new Date().toLocaleString()}
                    onChange={(date) => setSelectedSaleFromDate(date)}
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
                    value={selectedSaleToDate}
                    maxDate={new Date().toISOString()}
                    onChange={(date) => setSelectedSaleToDate(date)}
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
                    dispatch(
                      getSaleReport(selectedSaleFromDate, selectedSaleToDate)
                    )
                  }
                  disabled={loading}
                >
                  export Sale Csv
                </Button>
                {error && <div>{error}</div>}
              </Grid>
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: "10%" }}>
            <Grid item sm={12} md={12} lg={12} xl={12}>
              <Grid container justify="center" spacing={2}>
                <Grid item>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="From Date"
                    format="yyyy-MM-dd"
                    value={selectedRefundFromDate}
                    maxDate={new Date().toLocaleString()}
                    onChange={(date) => setSelectedRefundFromDate(date)}
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
                    value={selectedRefundToDate}
                    maxDate={new Date().toISOString()}
                    onChange={(date) => setSelectedRefundToDate(date)}
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
                    dispatch(
                      getRefundReport(
                        selectedRefundFromDate,
                        selectedRefundToDate
                      )
                    )
                  }
                  disabled={refundLoading}
                >
                  export Refund Csv
                </Button>
                {refundError && <div>{refundError}</div>}
              </Grid>
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </React.Fragment>
    );
  } else if (userInfo && userInfo.role === "ordermanager") {
    return (
      <React.Fragment>
        <header
          style={{
            position: "sticky",
            textAlign: "center",
            backgroundColor: "#303F9F",
            color: "#FFF",
            padding: "1vw",
            fontFamily: "cursive",
            fontSize: "1.1vw",
          }}
        >
          Produced By <em>ŞAHİN HORANY</em>
        </header>
        <Grid
          container
          style={{ marginTop: "10%" }}
          alignContent="center"
          alignItems="center"
          justify="center"
          direction="column"
        >
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Select Status</FormLabel>
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <FormControlLabel
                  value="completed"
                  control={<Radio style={{ color: "green" }} />}
                  label="completed"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="cancelled"
                  control={<Radio style={{ color: "red" }} />}
                  label="cancelled"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="refunded"
                  control={<Radio style={{ color: "purple" }} />}
                  label="refunded"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="shipped"
                  control={<Radio style={{ color: "pink" }} />}
                  label="shipped"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="confirmed"
                  control={<Radio style={{ color: "yellow" }} />}
                  label="confirmed"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="damaged-return"
                  control={<Radio style={{ color: "darkred" }} />}
                  label="damaged return"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="returned-to-store"
                  control={<Radio style={{ color: "cyan" }} />}
                  label="returned to store"
                  labelPlacement="bottom"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextareaAutosize
              rowsMin={5}
              cols={40}
              value={ids}
              onChange={(e) => setIds(e.target.value)}
              placeholder="Paste Id's"
            />
          </Grid>
          <Button
            size="small"
            // style={{ width: "71%" }}
            variant="contained"
            color="primary"
            onClick={() => {
              dispatch(changeStatus(ids, status));
              setOpenBackDrop(true);
            }}
            disabled={statusloading}
          >
            change status{" "}
          </Button>
        </Grid>
        <Backdrop className={classes.backdrop} open={openBackDrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            done!{" "}
          </Alert>
        </Snackbar>
      </React.Fragment>
    );
  } else if (userInfo && userInfo.role === "productmanager") {
    return (
      <React.Fragment>
        <header
          style={{
            position: "sticky",
            textAlign: "center",
            backgroundColor: "#303F9F",
            color: "#FFF",
            padding: "1vw",
            fontFamily: "cursive",
            fontSize: "1.1vw",
          }}
        >
          Produced By <em>ŞAHİN HORANY</em>
        </header>
        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
        <Grid container style={{ marginTop: "5vmax" }}>
          <Grid item sm={12} md={12} lg={12} xl={12}>
            <Grid
              container
              justify="center"
              direction="column"
              alignContent="center"
              alignItems="center"
              spacing={10}
            >
              <Grid item>
                <TextareaAutosize
                  rowsMin={5}
                  cols={40}
                  value={productIds}
                  onChange={(e) => setproductIds(e.target.value)}
                  placeholder="Paste Id's"
                />
              </Grid>
              <Grid item>
                <TextareaAutosize
                  rowsMin={5}
                  cols={40}
                  value={prices}
                  onChange={(e) => setPrices(e.target.value)}
                  placeholder="Paste prices"
                />
              </Grid>
              <Grid item>
                <Button
                  size="large"
                  variant="outlined"
                  color="primary"
                  onClick={() => dispatch(changePrice(productIds, prices))}
                  disabled={loading}
                >
                  Change Prices{" "}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* </MuiPickersUtilsProvider> */}

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
