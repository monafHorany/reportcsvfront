import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@material-ui/core";
import { login } from "../action/user-action";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 400,
    },
  },
  root_bottun: {
    "& > *": {
      margin: theme.spacing(1),
      width: 400,
    },
  },
}));

const LoginScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error } = userLogin;

  const formSubimt = (e) => {
    e.preventDefault();
    console.log("submitted");
    if (!name) {
      alert("email can't be empty");
    } else if (!password) {
      alert("password can't be empty");
    } else {
      dispatch(login(name, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);
  return (
    <div>
      <Container
        maxWidth="xl"
        style={{ textAlign: "center", marginTop: "24vh" }}
      >
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={formSubimt}
        >
          <div>
            <TextField
              required
              label="user name"
              value={name}
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <TextField
              required
              label="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
            />
          </div>
          <div className={classes.root_bottun}>
            <Button
              size="large"
              variant="outlined"
              color="primary"
              type="submit"
            >
              Login
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default LoginScreen;
