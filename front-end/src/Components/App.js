import React, { useState } from "react";
import "../Styles/App.css";
import UserInputForm from "./UserInputForm";
import AppealCoverTemplate from "./AppealCoverTemplate";
import { PdfContext } from "../Contexts/PdfContext";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";

export default function App() {
  const [caseNumber, setCaseNumber] = useState("");
  const [appellants, setAppellants] = useState([""]);
  const [respondents, setRespondents] = useState([""]);
  const [solicitors, setSolicitors] = useState([{ name: "", party: "" }]);

  const [showDownloadLink, setShowDownloadLink] = useState(false);

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
    console.log("howdy");
    const fileName = `roa_${Date.now()}.pdf`;

    return (
      <PDFDownloadLink document={pdf} fileName={fileName}>
        {({ blob, url, loading, error }) =>
          loading ? "Generating PDF..." : "Download PDF"
        }
      </PDFDownloadLink>
    );
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
        }}
      >
        <div className="container-one"></div>
        <div className="container-two"></div>
        <div className="container-three">
          <UserInputForm />
        </div>
        <div className="container-four"></div>
        {showDownloadLink ? (
          <PdfContext.Provider
            value={{
              caseNumber,
              appellants,
              respondents,
              solicitors,
            }}
          >
            {showDownloadLink && handleShowDownloadPdf()}
          </PdfContext.Provider>
        ) : null}
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
