import React, { useContext } from "react";
import { PdfContext } from "../Contexts/PdfContext";
import "../Styles/LivePreview.css";

export default function LivePreview() {
  const { caseNumber, appellants, respondents, solicitors } =
    useContext(PdfContext);

  const pdfPreview = (
    <div className="preview-a4-size">
      <div className="preview-title-section">
        <p>IN THE MALAYSIAN COURT OF APPEAL</p>
        <p>(APPELLATE JURISDICTION)</p>
        <p className="caseno">CIVIL APPEAL NO. {caseNumber}</p>
      </div>
      <div className="preview-and-between">
        <p>BETWEEN</p>
      </div>
      {appellants.map((app, index) => (
        <div key={index} className="the-parties-container">
          <p>
            {index + 1}. {app}
          </p>
          {index === appellants.length - 1 ? <p>... Appellant</p> : null}
        </div>
      ))}
      <div className="preview-and-between">
        <p>AND</p>
      </div>
      {respondents.map((res, index) => (
        <div key={index} className="the-parties-container">
          <p>
            {index + 1}. {res}
          </p>
          <p>
            {index === respondents.length - 1 ? <p>... Respondent</p> : null}
          </p>
        </div>
      ))}
      <div className="volume-section">
        <p>RECORD OF APPEAL</p>
        <p>VOLUME 1</p>
        <p>[SECTION A]</p>
      </div>
      {solicitors.map((sol, index) => {
        if ((index + 1) % 2 === 0) {
          return null;
        }
        const nextSol = solicitors[index + 1];

        return (
          <div key={index} className="adv">
            <div key={index} className="leftAdv">
              <p>{sol.name}</p>
              <p>Solicitors for the {sol.party}</p>
            </div>

            {nextSol ? (
              <div key={index + 1} className="rightAdv">
                <p>{nextSol.name}</p>
                <p>Solicitors for the {nextSol.party}</p>
              </div>
            ) : (
              <div key={index + 1} className="rightAdv"></div>
            )}
          </div>
        );
      })}
    </div>
  );
  return pdfPreview;
}
