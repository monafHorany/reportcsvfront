import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <Router>
      <Route path="/" exact component={HomeScreen} />
      <Route path="/login" component={LoginScreen} />
    </Router>
  );
}

export default App;
