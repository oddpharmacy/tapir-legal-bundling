import React, { useContext, useState } from "react";
import { PdfContext } from "../Contexts/PdfContext";
import "../Styles/Login.css";

export default function Login() {
  const {
    username,
    password,
    setUsername,
    setPassword,
    setIsLoggedIn,
    setShowLogin,
    setShowSignup,
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
    setIsLoggedIn(true);
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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      console.log("Response: ", response);
      console.log("Response body: ", response.body);

      if (response.ok) {
        console.log("Logging in...");
        handleCloseLogin();
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
        <button onClick={(e) => handleCloseLogin(e)}>x</button>
        <hr></hr>
        <form onSubmit={handleLoginTrigger}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <input type="submit" className="login-submit-button" />
        </form>
        {loginFailed ? (
          <p>Login unsuccessful. Incorrect username or password.</p>
        ) : null}
        <button onClick={handleShowSignUp} className="show-signup-button">
          Sign Up
        </button>
      </div>
    </div>
  );
}
