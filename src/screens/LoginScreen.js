import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@material-ui/core";

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
  return (
    <div>
      <Container
        maxWidth="xl"
        style={{ textAlign: "center", marginTop: "24vh" }}
      >
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            <TextField
              value={name}
              placeholder="user name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              variant="outlined"
            />
          </div>
          <div className={classes.root_bottun}>
            <Button size="large" variant="outlined" color="primary">
              Login
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default LoginScreen;
