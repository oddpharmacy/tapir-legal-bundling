// Package imports
import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";

// Style imports
import "../Styles/App.css";

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
      <PDFDownloadLink document={pdf} fileName={fileName}>
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
    <>
      <p>Hi, I'm here, I'm reacting hehe</p>
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
          setIsLoggedIn,
          setShowLogin,
          setShowSignup,
        }}
      >
        {showLogin ? <Login /> : showSignUp ? <Signup /> : null}
        <div className="container-one">
          <button onClick={(e) => handleShowLogin(e)}>Login</button>
        </div>
        <div className="container-two"></div>
        <div className="container-three">
          <UserInputForm />
        </div>
        <div className="container-four"></div>
        {showDownloadLink && handleShowDownloadPdf()}
        <LivePreview />
      </PdfContext.Provider>
    </>
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
