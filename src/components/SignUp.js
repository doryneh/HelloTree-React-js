import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";
import "./style.css";
import $ from "jquery";

export default class Signup extends Component {
  userData;
  constructor(props) {
    super(props);
    this.state = {
      signupData: {
        name: "",
        email: "",
        phone: "",
        password: "",
        passwordConfi:"",
        isLoading: "",
      },
      msg: "",
    };
  }
PasswordConfirmation =() => {
    $("#btnSubmit").click(function () {
      var password = $("#myInput").val();
      var confirmPassword = $("#myInputConfirmation").val();
      if (password !== confirmPassword) {
        alert("Your password does not match");
        return false;
      }
      return true;
    });
  }; 
  ShowPass = () => {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
   ShowPassConfi = () => {
    var x = document.getElementById("myInputConfirmation");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

UserType =() =>{
    $("#form-checkout Input[name='inlineRadioOptions']").change(function(){
      var Checkbox =$(this).val();
      if(Checkbox === 'option2'){
        $('#companyName').css('display' , "none");
      }
      else{
        $('#companyName').css('display' , "block");
      }
      $('#companyName').toggle();
    });
    }    

  onChangehandler = (e, key) => {
    const { signupData } = this.state;
    signupData[e.target.name] = e.target.value;
    this.setState({ signupData });
  };
  onSubmitHandler = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    axios
      .post("http://localhost:8000/api/user-signup", this.state.signupData)
      .then((response) => {
        this.setState({ isLoading: false });
        if (response.data.status === 200) {
          this.setState({
            msg: response.data.message,
            signupData: {
              name: "",
              email: "",
              phone: "",
              password: "",
              passwordConfi:"",
            },
          });
          setTimeout(() => {
            this.setState({ msg: "" });
          }, 2000);
        }

        if (response.data.status === "failed") {
          this.setState({ msg: response.data.message });
          setTimeout(() => {
            this.setState({ msg: "" });
          }, 2000);
        }
      });
  };
  render() {
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
              <div className="white longWhite">
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
                    <Link to="/" className="btn btn-secondary firstBtn ">
                      <input
                        type="radio"
                        name="options"
                        id="option1"
                        autoComplete="off"
                      />
                      Sign in
                    </Link>
                    <Link
                      to="/sign-up"
                      className="btn btn-secondary secondBtn active"
                    >
                      <input
                        type="radio"
                        name="options"
                        id="option2"
                        autoComplete="off"
                        defaultChecked
                      />
                      Sign up
                    </Link>
                  </div>
                </div>
                <form action="" id="form-checkout">

                <div className="UserType mt-3 mb-2">
                  <h6>What type of user are you?</h6>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="option1"
                      defaultChecked
                      onClick={this.UserType}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      Public
                      <br />
                      <span className="PublicDetails shown">
                        <i className="fas fa-question-circle"></i> More details
                        <div className="info">
                          <img
                            src="images/Info.png"
                            alt="info.png"
                            className="info   shown d-none"
                          />
                        </div>
                      </span>
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value="option2"
                      onClick={this.UserType}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio2">
                      Service provider
                      <br />
                      <span className="Details">
                        <i className="fas fa-question-circle"></i> More details
                      </span>
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio3"
                      value="option3"
                      onClick={this.UserType}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio3">
                      Funder
                      <br />
                      <span className="Details">
                        <i className="fas fa-question-circle"></i> More details
                      </span>
                    </label>
                  </div>
                </div>
                </form>
                <Form className="containers">
                  <FormGroup className="input-group input-group-lg mb-3 ">
                    <Input
                      type="name"
                      name="name"
                      placeholder="Name"
                      value={this.state.signupData.name}
                      onChange={this.onChangehandler}
                      className="form-control"
                    />
                  </FormGroup>
                  <FormGroup
                    className="input-group input-group-lg mb-3"
                    id="companyName"
                  >
                    <Input
                      type="text"
                      className="form-control companyName"
                      aria-label="Large"
                      placeholder="Company name"
                    />
                  </FormGroup>
                  <FormGroup className="input-group input-group-lg mb-3">
                    <Input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email adress"
                      value={this.state.signupData.email}
                      onChange={this.onChangehandler}
                    />
                  </FormGroup>
                  <FormGroup className="input-group input-group-lg mb-3">
                    <Input
                      type="phone"
                      name="phone"
                      className="form-control"
                      placeholder="Phone number"
                      value={this.state.signupData.phone}
                      onChange={this.onChangehandler}
                    />
                  </FormGroup>
                  <FormGroup className="input-group input-group-lg mb-3 pass">
                    <Input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      value={this.state.signupData.password}
                      onChange={this.onChangehandler}
                      id="myInput"
                    />
                    <span className="ShowPass" onClick={this.ShowPass}>
                      <i className="fas fa-eye"></i>
                    </span>
                  </FormGroup>
                  <FormGroup className="input-group input-group-lg mb-3 pass">
                    <Input
                      type="password"
                      name="passwordConfi"
                      className="form-control"
                      placeholder="Confirm password"
                      value={this.state.signupData.passwordConfi}
                      onChange={this.onChangehandler}
                      id="myInputConfirmation"
                    />
                    <span className="ShowPass" onClick={this.ShowPassConfi}>
                      <i className="fas fa-eye"></i>
                    </span>
                  </FormGroup>
                  <p className="text-white">{this.state.msg}</p>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input TermAndPolice"
                      type="radio"
                      name="privacyAndPolice"
                      id="privacy"
                      value="option1"
                    />
                    <label
                      className="form-check-label mb-2 ReadAndAccept"
                      htmlFor="privacy"
                    >
                      I have read and accept the terms & police
                    </label>
                  </div>
                  <div className="inBtn">
                    <Button
                      className="btn btn-primary"
                      onClick={this.onSubmitHandler,this.PasswordConfirmation}
                      id="btnSubmit"
                    >
                      Create my account
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
                  </div>
                </Form>
              </div>
          </div>
        </div>
    );
  }
}
