import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

function App() {
  return (
    <Router>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </React.Suspense>
    </Router>
  );
}

export default App;
