import React, { useContext } from "react";
import { PdfContext } from "../Contexts/PdfContext";
import "../Styles/UserPage.css";

export default function UserPage({ handleGetUserCoverpageData }) {
  const { userCoverpageData, setShowUserPage, currentUserId } =
    useContext(PdfContext);
  return (
    <div className="userpage-container">
      <p className="userpage-title">HISTORY</p>
      <button
        onClick={() => setShowUserPage(false)}
        className="userpage-button"
      >
        Close
      </button>
      <button
        onClick={() => handleGetUserCoverpageData(currentUserId)}
        className="userpage-button"
      >
        Refresh
      </button>
      <div className="userpage-history">
        {userCoverpageData.map((data, index) => (
          <div key={index} className="userpage-case">
            <h4>Case Number: {data.case_number}</h4>
            <div>
              {data.appellants.map((app, index) => (
                <p>
                  Appellant {index + 1}: {app.name}
                </p>
              ))}
              {data.respondents.map((res, index) => (
                <p>
                  Respondent {index + 1}: {res.name}
                </p>
              ))}
            </div>
            <div>
              <p>Solicitors</p>
              {data.solicitors.map((sol, index) => (
                <p>
                  {index + 1}. {sol.name} for the {sol.party}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
