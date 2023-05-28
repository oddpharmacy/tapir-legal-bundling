import React, { useContext, useState } from "react";
import { PdfContext } from "../Contexts/PdfContext";
import "../Styles/Signup.css";

export default function Signup() {
  const { setShowSignup } = useContext(PdfContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [signupFailed, setSignupFailed] = useState(false);

  // Handlers
  const handleNewUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setAgreeToTerms(event.target.checked);
  };

  const handleSignupFailed = () => {
    setSignupFailed(true);
    setTimeout(() => {
      setSignupFailed(false);
    }, 4000);
  };

  const handleCloseSignup = (event) => {
    event.preventDefault();
    setShowSignup(false);
  };

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowSignup(false);
    }
  };

  // POST Request
  const handleSignupTrigger = async (event) => {
    event.preventDefault();
    console.log("newuser: ", username);
    console.log("newpassword: ", password);
    try {
      const response = await fetch(
        "https://tapir-legal-backend.onrender.com/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      console.log("Response: ", response);
      const body = await response.text();
      console.log("Response body: ", body);

      if (response.ok) {
        alert("Signup successful!");
        console.log("Signup successful!");
        setShowSignup(false);
      } else {
        console.log("Signup failed.");
        handleSignupFailed();
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="signup-overlay" onClick={handleOutsideClick}>
      <div className="signup-container">
        <button
          onClick={(e) => handleCloseSignup(e)}
          className="login-close-button"
        >
          x
        </button>
        <hr className="login-line submit-line"></hr>
        <form onSubmit={handleSignupTrigger}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={handleNewUsernameChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={handleNewPasswordChange}
              className="form-input"
              required
            />
          </div>
          <div className="checkbox-container">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={handleCheckboxChange}
                className="checkbox"
                required
              />
              <span className="checkbox-custom"></span>I agree to the terms of
              use.
            </label>
          </div>
          <div className="signup-submit-container">
            <input type="submit" className="login-submit-button" />
          </div>
        </form>
        {signupFailed ? (
          <p className="handle-failure">
            Signup unsuccessful. Username already exists.
          </p>
        ) : null}
      </div>
    </div>
  );
}
