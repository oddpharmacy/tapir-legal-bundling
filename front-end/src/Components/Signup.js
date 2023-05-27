import React, { useState } from "react";
import { PdfContext } from "../Contexts/PdfContext";
import "../Styles/Signup.css";

export default function Signup() {
  const { setShowSignup } = useState(PdfContext);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [signupFailed, setSignupFailed] = useState(false);

  // Handlers
  const handleNewUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setAgreeToTerms(event.target.checked);
  };

  const handleCloseSignUp = () => {
    setShowSignup(false);
  };

  const handleSignupFailed = () => {
    setSignupFailed(true);
    setTimeout(() => {
      setSignupFailed(false);
    }, 4000);
  };

  // POST Request
  const handleSignupTrigger = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://tapir-legal-backend.onrender.com/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newUsername, newPassword }),
        }
      );

      console.log("Response: ", response);
      const body = await response.text();
      console.log("Response body: ", body);

      if (response.ok) {
        console.log("Signup successful!");
        handleCloseSignUp();
      } else {
        console.log("Signup failed.");
        handleSignupFailed();
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="signup-overlay">
      <div className="signup-container">
        <button>x</button>
        <hr></hr>
        <form onSubmit={handleSignupTrigger}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={newUsername}
              onChange={handleNewUsernameChange}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              required
            />
          </div>
          <div className="checkbox-container">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={handleCheckboxChange}
                required
              />
              I agree to the terms of use.
            </label>
          </div>
          <input type="submit" className="submit-button" />
        </form>
        {signupFailed ? <p>Signup unsuccessful. Username taken.</p> : null}
      </div>
    </div>
  );
}
