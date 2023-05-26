import React, { useState } from "react";
import "../Styles/App.css";
import UserInputForm from "./UserInputForm";
import AppealCoverTemplate from "./AppealCoverTemplate";
import { PdfContext } from "../Contexts/PdfContext";
import { PDFViewer } from "@react-pdf/renderer";

export default function App() {
  const [caseNumber, setCaseNumber] = useState("");
  const [appellants, setAppellants] = useState([""]);
  const [respondents, setRespondents] = useState([""]);
  const [solicitors, setSolicitors] = useState([{ name: "", party: "" }]);
  const [generatePdf, setGeneratePdf] = useState(false);

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
          setGeneratePdf,
        }}
      >
        <div className="container-one"></div>
        <div className="container-two"></div>
        <div className="container-three">
          <UserInputForm />
        </div>
        <div className="container-four"></div>
        {generatePdf ? (
          <PDFViewer style={{ width: "70%", height: "500px" }}>
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
          </PDFViewer>
        ) : null}
      </PdfContext.Provider>
    </>
  );
}
