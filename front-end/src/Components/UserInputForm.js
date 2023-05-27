import React, { useContext, useState } from "react";
import { PdfContext } from "../Contexts/PdfContext";
import AppealCoverTemplate from "./AppealCoverTemplate";
import { PDFDownloadLink } from "@react-pdf/renderer";
import "../Styles/UserInputForm.css";

export default function UserInputForm() {
  const {
    caseNumber,
    setCaseNumber,
    appellants,
    setAppellants,
    respondents,
    setRespondents,
    solicitors,
    setSolicitors,
    setShowDownloadLink,
  } = useContext(PdfContext);

  // Handlers
  const handleGenerateButtonClick = (event) => {
    event.preventDefault();
    setShowDownloadLink(true);
  };

  // Cases
  const handleCaseNumberChange = (event) => {
    setCaseNumber(event.target.value);
  };

  // Appellants
  const handleAppellantsChange = (event, index) => {
    const updatedAppellants = [...appellants];
    updatedAppellants[index] = event.target.value;
    setAppellants(updatedAppellants);
  };

  const addAppellant = (event) => {
    event.preventDefault();
    setAppellants([...appellants, ""]);
  };

  const removeAppellant = (index) => {
    const updatedAppellants = [...appellants];
    updatedAppellants.splice(index, 1);
    setAppellants(updatedAppellants);
  };

  // Respondents
  const handleRespondentsChange = (event, index) => {
    const updatedRespondents = [...respondents];
    updatedRespondents[index] = event.target.value;
    setRespondents(updatedRespondents);
  };

  const addRespondent = (event) => {
    event.preventDefault();
    setRespondents([...respondents, ""]);
  };

  const removeRespondent = (index) => {
    const updatedRespondents = [...respondents];
    updatedRespondents.splice(index, 1);
    setRespondents(updatedRespondents);
  };

  // Solicitors
  const handleSolicitorsChange = (event, index) => {
    const updatedSolicitors = [...solicitors];
    updatedSolicitors[index].name = event.target.value;
    setSolicitors(updatedSolicitors);
  };

  const handleRepresentingChange = (event, index) => {
    const updatedSolicitors = [...solicitors];
    updatedSolicitors[index].party = event.target.value;
    setSolicitors(updatedSolicitors);
  };

  const addSolicitor = (event) => {
    event.preventDefault();
    setSolicitors([...solicitors, { name: "", party: "" }]);
  };

  const removeSolicitor = (index) => {
    const updatedSolicitors = [...solicitors];
    updatedSolicitors.splice(index, 1);
    setSolicitors(updatedSolicitors);
  };

  return (
    <div id="form-container">
      <h3>BUNDLE RECORD OF APPEAL</h3>
      <h5>COVER PAGE CREATION</h5>
      <form className="appeal-form">
        <div>
          <label>Case Number</label>
          <input
            type="text"
            value={caseNumber}
            onChange={handleCaseNumberChange}
            required
            className="casenumber-input"
          />
          <hr className="casenum-hr"></hr>
        </div>
        <div>
          <div className="party-container">
            <label className="party-label">Appellant(s):</label>
            <button onClick={addAppellant} className="add-party-button">
              Add Appellant
            </button>
          </div>
          {appellants.map((app, index) => (
            <div key={index} className="input-container">
              <input
                type="text"
                value={app}
                onChange={(e) => handleAppellantsChange(e, index)}
                required
                className="appeal-cover-form-input"
              />
              {index > 0 ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeAppellant(index);
                  }}
                  className="remove-button"
                >
                  x
                </button>
              ) : null}
            </div>
          ))}
        </div>
        <div>
          <div className="party-container">
            <label className="party-label">Respondent(s):</label>
            <button onClick={addRespondent} className="add-party-button">
              Add Respondent
            </button>
          </div>
          {respondents.map((res, index) => (
            <div key={index} className="input-container">
              <input
                type="text"
                value={res}
                onChange={(e) => handleRespondentsChange(e, index)}
                required
                className="appeal-cover-form-input"
              />
              {index > 0 ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeRespondent(index);
                  }}
                  className="remove-button"
                >
                  x
                </button>
              ) : null}
            </div>
          ))}
        </div>
        <div className="sol-div">
          <div className="party-container">
            <label className="party-label">Solicitors</label>
            <button onClick={addSolicitor} className="add-party-button">
              Add Solicitor
            </button>
          </div>
          <hr></hr>
          {solicitors.map((sol, index) => (
            <div key={index} className="input-container">
              <div>
                <label>Firm:</label>
                <input
                  type="text"
                  value={sol.name}
                  onChange={(e) => handleSolicitorsChange(e, index)}
                  required
                  className="appeal-cover-form-input"
                />
              </div>

              <div>
                <label>Representing:</label>
                <input
                  type="text"
                  value={sol.party}
                  onChange={(e) => handleRepresentingChange(e, index)}
                  required
                  className="appeal-cover-form-input"
                />
                {index > 0 ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeSolicitor(index);
                    }}
                    className="remove-button"
                  >
                    x
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <div className="generate-container">
          <button
            onClick={(e) => handleGenerateButtonClick(e)}
            className="generate-button"
          >
            Generate PDF
          </button>
        </div>
      </form>
    </div>
  );
}

//   {/* <button
//     onClick={(e) => {
//       e.preventDefault();
//       console.log("userinputform caseNumber: ", caseNumber);
//       console.log("userinput app array: ", appellants);
//       setGeneratePdf(true);
//     }}
//   >
//     CLICK ME
//   </button> */}
