import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";
import "./style.css";
export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      msg: "",
      isLoading: false,
      redirect: false,
      errMsgEmail: "",
      errMsgPwd: "",
      errMsg: "",
    };
  }
  ShowPass = () => {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  onChangehandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let data = {};
    data[name] = value;
    this.setState(data);
  };

  onSignInHandler = () => {
    this.setState({ isLoading: true });
    axios
      .post("http://localhost:8000/api/user-login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((response) => {
        this.setState({ isLoading: false });
        if (response.data.status === 200) {
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userData", JSON.stringify(response.data.data));
          this.setState({
            msg: response.data.message,
            redirect: true,
          });
        }
        if (
          response.data.status === "failed" &&
          response.data.success === undefined
        ) {
          this.setState({
            errMsgEmail: response.data.validation_error.email,
            errMsgPwd: response.data.validation_error.password,
          });
          setTimeout(() => {
            this.setState({ errMsgEmail: "", errMsgPwd: "" });
          }, 2000);
        } else if (
          response.data.status === "failed" &&
          response.data.success === false
        ) {
          this.setState({
            errMsg: response.data.message,
          });
          setTimeout(() => {
            this.setState({ errMsg: "" });
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/home" />;
    }
    const login = localStorage.getItem("isLoggedIn");
    if (login) {
      return <Redirect to="/home" />;
    }
    const isLoading = this.state.isLoading;
    return (
        <div className="back">
          <div className="green">
            <div className="logo">
              <img src="images/Group 22.png" alt="logo" />
            </div>
            <div className="text">
              <div className="textTop">
                <img
                  src="images/Quality, proximity& responsibility..png"
                  alt="text"
                />
              </div>
              <div className="textBottom">
                <img
                  src="images/These are the core values of our journey.We believe in delivering on our promises..png"
                  alt="text"
                />
              </div>
            </div>
            <div className="white">
              <div className="exit">
                <Link to="/">
                  <img src="images/Icon.png" alt="" />
                </Link>
              </div>
              <div className="SignButtons">
                <div
                  className="btn-group btn-group-toggle"
                  data-toggle="buttons"
                >
                  <Link to="/" className="btn btn-secondary firstBtn active">
                    <input
                      type="radio"
                      name="options"
                      id="option1"
                      autoComplete="off"
                      defaultChecked
                    />
                    Sign in
                  </Link>
                  <Link
                    to="/sign-up"
                    className="btn btn-secondary secondBtn"
                  >
                    <input
                      type="radio"
                      name="options"
                      id="option2"
                      autoComplete="off"
                    />
                    Sign up
                  </Link>
                </div>
              </div>
              <Form className="containers">
                <FormGroup className="input-group input-group-lg mb-3 mt-5">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email adress"
                    value={this.state.email}
                    onChange={this.onChangehandler}
                    className="form-control"
                  />
                  <span className="text-danger">{this.state.msg}</span>
                  <span className="text-danger">{this.state.errMsgEmail}</span>
                </FormGroup>
                <FormGroup className="input-group input-group-lg pass">
                  <Input
                    id="myInput"
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChangehandler}
                  />
                  <span className="ShowPass" onClick={this.ShowPass}>
                    <i className="fas fa-eye"></i>
                  </span>
                  <span className="text-danger">{this.state.errMsgPwd}</span>
                </FormGroup>
                <p className="text-danger">{this.state.errMsg}</p>
                <div className="Forgot my-3">
                  <a to="">I forgot my password</a>
                </div>
                <div className="inBtn">
                  <Button
                    className="btn btn-primary"
                    role="button"
                    onClick={this.onSignInHandler}
                  >
                    Sign-in
                    {isLoading ? (
                      <span
                        className="spinner-border spinner-border-sm ml-5"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      <span></span>
                    )}
                    <span className="arrow">
                      <i className="fas fa-arrow-right"></i>
                    </span>
                  </Button>
                  <div className="AnotherWays mt-4">
                    <h6>Or sign in using</h6>
                    <div className="facebook my-3">
                      <Link className="btn btn-primary" to="" role="button">
                        <span className="logos">
                          <i className="fab fa-facebook-f"></i>
                        </span>
                        Facebook
                      </Link>
                      <div className="google mt-3">
                        <Link className="btn btn-primary" to="" role="button">
                          <span className="logos">
                            <i className="fab fa-google"></i>
                          </span>
                          Google
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
        </div>
      </div>
    );
  }
}
