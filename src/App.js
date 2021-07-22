import React, { Component } from "react";
import "./App.css";
import Signup from "./components/SignUp";
import Signin from "./components/Signin";
import './components/style.css';

import { BrowserRouter as Router, Route,Switch } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div className="App">
          <Router>            
          <Switch>

            <Route exact path="/sign-up" component={Signup}></Route>
            <Route path="/" component={Signin}></Route>
            </Switch>
          </Router>
      </div>
    );
  }
}