import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

export default function AppealCoverTemplate(props) {
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
      border: "1pt solid black",
      paddingTop: 10,
      paddingBottom: 10,
    },
  });

  const pdf = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.titlesection}>
          <Text>IN THE MALAYSIAN COURT OF APPEAL</Text>
          <Text>(APPELLATE JURISDICTION)</Text>
          <Text style={styles.casenumber}>CIVIL APPEAL NO. casenumber</Text>
        </View>
        <View style={styles.betweenAnd}>
          <Text>BETWEEN</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.leftText}>Guy Pleader</Text>
          <Text style={styles.rightText}>... Appellant</Text>
        </View>
        <View style={styles.betweenAnd}>
          <Text>AND</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.leftText}>Guy Responder</Text>
          <Text style={styles.rightText}>... Respondent</Text>
        </View>
        <View style={styles.volume}>
          <Text>RECORD OF APPEAL</Text>
          <Text>VOLUME 1</Text>
          <Text>[SECTION A]</Text>
        </View>
        <View style={styles.adv}>
          <View style={styles.leftAdv}>
            <Text>Firm A</Text>
            <Text>Solicitors for the Appellant</Text>
          </View>

          <View style={styles.rightAdv}>
            <Text>Firm B</Text>
            <Text>Solicitors for the Respondent</Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  return pdf;
}
