// Package imports
import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";

// Style imports
import "../Styles/App.css";
import tapirImage from "../Images/tapir.png";

// Component imports
import UserInputForm from "./UserInputForm";
import AppealCoverTemplate from "./AppealCoverTemplate";
import LivePreview from "./LivePreview";
import Login from "./Login";
import Signup from "./Signup";

// Context imports
import { PdfContext } from "../Contexts/PdfContext";

export default function App() {
  // States
  const [caseNumber, setCaseNumber] = useState("");
  const [appellants, setAppellants] = useState([""]);
  const [respondents, setRespondents] = useState([""]);
  const [solicitors, setSolicitors] = useState([{ name: "", party: "" }]);
  const [showDownloadLink, setShowDownloadLink] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");

  // Handlers
  const handleShowDownloadPdf = () => {
    // setShowDownloadLink(false);
    const pdf = (
      <PdfContext.Provider
        value={{
          caseNumber,
          appellants,
          respondents,
          solicitors,
        }}
      >
        <AppealCoverTemplate />
      </PdfContext.Provider>
    );
    const fileName = `roa_${Date.now()}.pdf`;

    return (
      <PDFDownloadLink
        document={pdf}
        fileName={fileName}
        className="pdf-download-link"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Generating PDF..." : "Download PDF"
        }
      </PDFDownloadLink>
    );
  };

  const handleShowLogin = (event) => {
    event.preventDefault();
    setShowLogin(true);
  };

  return (
    <div className="app-container">
      <PdfContext.Provider
        value={{
          caseNumber,
          setCaseNumber,
          appellants,
          setAppellants,
          respondents,
          setRespondents,
          solicitors,
          setSolicitors,
          setShowDownloadLink,
          username,
          setUsername,
          password,
          setPassword,
          isLoggedIn,
          setIsLoggedIn,
          setShowLogin,
          setShowSignup,
          setCurrentUserId,
          setCurrentUserName,
        }}
      >
        {showLogin ? <Login /> : showSignUp ? <Signup /> : null}
        <div className="container-one">
          <p className="copyright">©2023</p>
          <button
            onClick={(e) => handleShowLogin(e)}
            className="div-one-button"
          >
            Login
          </button>
          <button className="div-one-button">About</button>
          <button className="div-one-button">Usage</button>
          <button className="div-one-button">Terms</button>
          <button className="div-one-button">Team</button>
        </div>
        <div className="container-two">
          <img src={tapirImage} alt="Tapir" className="tapir-logo" />
          <span className="container-two-title-top">
            TAPIR
            <br />
            <span className="container-two-serif-font">A New Realm</span>
          </span>
          <div className="container-two-middle">
            A LEGAL BUNDLING APP
            <br />
            230525 <br />
            <span className="container-two-serif-font construction">
              <span className="orange-dot"></span> under construction
            </span>
          </div>
          <div className="container-two-bottom">
            VER. 001 <br />
            <span className="container-two-serif-font">2023</span>
          </div>
        </div>
        <div className="container-three">
          <div className="inner-container-three">
            <UserInputForm />
            <div className="download-link-container">
              {showDownloadLink && handleShowDownloadPdf()}
            </div>
          </div>
        </div>
        <div className="container-four">
          <LivePreview />
        </div>
      </PdfContext.Provider>
    </div>
  );
}

//  const [generatePdf, setGeneratePdf] = useState(false);
// {generatePdf ? (
//   <PDFViewer style={{ width: "70%", height: "500px" }}>
//     <PdfContext.Provider
//       value={{
//         caseNumber,
//         appellants,
//         respondents,
//         solicitors,
//       }}
//     >
//       <AppealCoverTemplate />
//     </PdfContext.Provider>
//   </PDFViewer>
// ) : null}
