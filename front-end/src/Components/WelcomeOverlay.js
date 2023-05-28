import React, { useContext } from "react";
import { PdfContext } from "../Contexts/PdfContext";
import "../Styles/WelcomeOverlay.css";
import tapirImage from "../Images/tapirglasses.png";

export default function WelcomeOverlay() {
  const { setShowWelcomeOverlay } = useContext(PdfContext);

  const handleOverlayClick = (event) => {
    event.preventDefault();
    setShowWelcomeOverlay(true);
  };

  return (
    <div className="welcome-overlay-container">
      <div className="welcome-overlay-contents">
        <h1 className="tapir-overlay-title">TAPIR</h1>
        <h4 className="tapir-overlay-subtitle">A Legal Bundling App</h4>
        <img
          src={tapirImage}
          alt="Tapir with Glasses"
          className="tapirglasses-logo"
        />
        <p className="tapir-overlay-text">
          Streamline your record of appeal creation with TAPIR.
        </p>
        <p className="tapir-overlay-text">
          Our user-friendly platform allows you to generate index and cover
          pages, as well as merge PDFs,
        </p>
        <p className="tapir-overlay-text">
          enabling you to compile a comprehensive and professional record of
          appeal for submission to Malaysian courts.
        </p>
        <button
          className="welcome-overlay-button"
          onClick={(e) => handleOverlayClick(e)}
        >
          Start creating a record now →
        </button>
      </div>
    </div>
  );
}
