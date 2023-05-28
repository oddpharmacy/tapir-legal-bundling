import React, { useContext, useState } from "react";
import { PdfContext } from "../Contexts/PdfContext";
import "../Styles/Login.css";

export default function Login() {
  const {
    username,
    password,
    setUsername,
    setPassword,
    isLoggedIn,
    setIsLoggedIn,
    setShowLogin,
    setShowSignup,
    setCurrentUserId,
    setCurrentUserName,
  } = useContext(PdfContext);

  const [loginFailed, setLoginFailed] = useState(false);

  // Handlers
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCloseLogin = (event) => {
    event.preventDefault();
    setShowLogin(false);
  };

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowLogin(false);
    }
  };

  const handleShowSignUp = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const handleLoginFailed = () => {
    setLoginFailed(true);
    setTimeout(() => {
      setLoginFailed(false);
    }, 4000);
  };

  // POST Request
  const handleLoginTrigger = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://tapir-legal-backend.onrender.com/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        console.log("Logging in...");
        setIsLoggedIn(true);
        setShowLogin(false);
        setUsername("");
        setPassword("");
        const body = JSON.parse(await response.text());
        setCurrentUserId(body[0].id);
        setCurrentUserName(body[0].username);
      } else {
        console.log("Login failed");
        handleLoginFailed();
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="login-overlay" onClick={handleOutsideClick}>
      <div className="login-container">
        <button
          onClick={(e) => handleCloseLogin(e)}
          className="login-close-button"
        >
          x
        </button>
        <hr className="login-line" />
        <form onSubmit={handleLoginTrigger} className="form-login">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="password-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="form-input"
              required
            />
          </div>
          <br />
          <div className="submit-button-container">
            <input type="submit" className="login-submit-button" />
          </div>
        </form>
        <button onClick={handleShowSignUp} className="show-signup-button">
          Sign Up
        </button>
        {loginFailed ? (
          <p className="handle-failure">
            Login unsuccessful. Incorrect username or password.
          </p>
        ) : null}
      </div>
    </div>
  );
}
