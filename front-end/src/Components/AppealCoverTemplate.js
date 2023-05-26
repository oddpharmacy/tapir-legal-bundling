import React, { useContext } from "react";
import { PdfContext } from "../Contexts/PdfContext";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

export default function AppealCoverTemplate() {
  const { caseNumber, appellants, respondents, solicitors } =
    useContext(PdfContext);

  const styles = StyleSheet.create({
    page: {
      backgroundColor: "tomato",
      color: "black",
      fontSize: 12,
      lineHeight: 1.5,
    },
    titlesection: { textAlign: "center", marginTop: 50, marginBottom: 17 },
    casenumber: { textDecoration: "underline" },
    betweenAnd: { textAlign: "center", marginBottom: 17 },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      flexWrap: "wrap",
      marginLeft: 60,
      marginRight: 60,
      marginBottom: 17,
    },
    leftText: { textAlign: "left", flex: 3 },
    rightText: { textAlign: "right", flex: 1 },
    volume: {
      borderTop: "1.5pt solid black",
      borderBottom: "1.5pt solid black",
      marginLeft: 60,
      marginRight: 60,
      marginTop: 3,
      marginBottom: 17,
      textAlign: "center",
      paddingTop: 15,
      paddingBottom: 15,
      paddingLeft: 10,
      paddingRight: 10,
    },
    adv: {
      flexDirection: "row",
      textAlign: "center",
      marginLeft: 60,
      marginRight: 60,
    },
    leftAdv: {
      flex: 1,
      border: "1pt solid black",
      paddingTop: 10,
      paddingBottom: 10,
    },
    rightAdv: {
      flex: 1,
      borderTop: "1pt solid black",
      borderRight: "1pt solid black",
      borderBottom: "1pt solid black",
      paddingTop: 10,
      paddingBottom: 10,
    },
  });

  const pdf = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.titlesection}>
          {console.log("case number: ", caseNumber)}
          <Text>IN THE MALAYSIAN COURT OF APPEAL</Text>
          <Text>(APPELLATE JURISDICTION)</Text>
          <Text style={styles.casenumber}>CIVIL APPEAL NO. {caseNumber}</Text>
        </View>
        <View style={styles.betweenAnd}>
          <Text>BETWEEN</Text>
          {console.log("appellants: ", appellants)}
        </View>
        {appellants.map((app, index) => (
          <View style={styles.row} key={index}>
            <Text style={styles.leftText}>
              {index + 1}. {app}
            </Text>
            {index === appellants.length - 1 ? (
              <Text style={styles.rightText}>... Appellant</Text>
            ) : null}
          </View>
        ))}
        <View style={styles.betweenAnd}>
          <Text>AND</Text>
        </View>
        {respondents.map((res, index) => (
          <View style={styles.row} key={index}>
            <Text style={styles.leftText}>
              {index + 1}. {res}
            </Text>
            {index === respondents.length - 1 ? (
              <Text style={styles.rightText}>... Respondent</Text>
            ) : null}
          </View>
        ))}
        <View style={styles.volume}>
          <Text>RECORD OF APPEAL</Text>
          <Text>VOLUME 1</Text>
          <Text>[SECTION A]</Text>
        </View>
        {solicitors.map((sol, index) => {
          if ((index + 1) % 2 === 0) {
            return null;
          }
          const nextSol = solicitors[index + 1];

          return (
            <View style={styles.adv} key={index}>
              <View style={styles.leftAdv} key={index}>
                <Text>{sol.name}</Text>
                <Text>Solicitors for the {sol.party}</Text>
              </View>

              {nextSol ? (
                <View style={styles.rightAdv} key={index + 1}>
                  <Text>{solicitors[index + 1].name}</Text>
                  <Text>Solicitors for the {solicitors[index + 1].party}</Text>
                </View>
              ) : (
                <View style={styles.rightAdv} key={index + 1} />
              )}
            </View>
          );
        })}
      </Page>
    </Document>
  );

  return pdf;
}
