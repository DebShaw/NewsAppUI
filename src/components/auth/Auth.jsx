import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, signup } from "../../actions/auth";
import "./Auth.css";
import logo from "./../../assets/auth_figure.png";
import Navbar from "../Navbar/Navbar";
import { forgotPassword } from "../../actions/auth";
const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Enter email");
    } else if (!password) {
      alert("Enter password");
    } else {
      if (isSignup) {
        if (!name) {
          alert("Enter your name to continue");
        } else if (password.length < 8) {
          alert("Passwords must contain at least eight characters.");
        } else if (
          password.search(/[0-9]/) === -1 &&
          (password.search(/[a-z]/) === -1 || password.search(/[A-Z]/) === -1)
        ) {
          alert("Password must contain at least 1 number & at least 1 letter");
        } else if (confirmedPassword !== password) {
          alert("Password and Confirmed does not match");
        } else {
          dispatch(signup({ name, email, password }, navigate));
        }
      } else {
        dispatch(login({ email, password }, navigate));
      }
    }
  };
  const handleForgot = () => {
    if (!email) {
      alert("Enter Email First");
      return;
    }
    dispatch(forgotPassword({ email }, navigate));
  };
  return (
    <div>
      <Navbar />
      <section className="auth-section">
        <div className="auth-container-1">
          <div className="auth-container-1-sub-1">
            <h2 style={{ color: "white" }}>
              {isSignup ? "Sign Up" : "Sign In"} to
            </h2>
            <h1 style={{ color: "white" }}>News App</h1>
            <div className="auth-sub-container-1">
              <div>
                {isSignup ? (
                  <>
                    <p
                      style={{ color: "white" }}
                      className="auth-container-1-content"
                    >
                      If you already have an account
                    </p>
                    <div className="auth-container-1-sub-content">
                      <p style={{ color: "white" }}>You can</p>
                      <button
                        className="auth-container-1-btn"
                        onClick={() => setIsSignup(false)}
                      >
                        Login here !
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p
                      style={{ color: "white" }}
                      className="auth-container-1-content"
                    >
                      If you don't have an account
                    </p>
                    <div className="auth-container-1-sub-content">
                      <p style={{ color: "white" }}>You can</p>
                      <button
                        className="auth-container-1-btn"
                        onClick={() => setIsSignup(true)}
                      >
                        Register here !
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div
                style={{ position: "relative" }}
                className="auth-container-1-sub-2"
              >
                <img src={logo} alt=""></img>
              </div>
            </div>
          </div>
        </div>
        <div className="auth-container-2">
          <h1 style={{ color: "white" }}>{isSignup ? "Sign Up" : "Sign in"}</h1>
          <div>
            <input
              placeholder="Enter Email"
              type="email"
              name="email"
              id="email"
              className="auth-container-input"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {isSignup && (
              <input
                placeholder="Create User Name"
                type="text"
                name="name"
                id="name"
                className="auth-container-input"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            )}
            <input
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              className="auth-container-input"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {isSignup && (
              <input
                placeholder="Confirm Password"
                type="password"
                name="password"
                id="password"
                className="auth-container-input"
                onChange={(e) => {
                  setConfirmedPassword(e.target.value);
                }}
              />
            )}
            <div className="forgot">
              {!isSignup && (
                <button onClick={handleForgot} className="forgot-content">
                  Forgot password
                </button>
              )}
            </div>
            <button onClick={handleSubmit} type="submit" className="auth-btn">
              {isSignup ? "Sign up" : "Log in"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Auth;
