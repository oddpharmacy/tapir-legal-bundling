const casesModel = require("../model/cases");

module.exports = {
  async createCase(req, res) {
    try {
      const { userId, caseNumber, appellants, respondents, solicitors } =
        req.body;
      console.log(req.body);
      const newCase = await casesModel.createCase(userId, caseNumber);
      console.log("newcase ", newCase);
      const caseId = newCase[0].id;

      await casesModel.createAppellants(caseId, appellants);
      await casesModel.createRespondents(caseId, respondents);
      await casesModel.createSolicitors(caseId, solicitors);

      res.status(201).send("Case created successfully");
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).send("Failed to create new case");
    }
  },

  async getCasesByUser(req, res) {
    try {
      const userId = req.params.userId;
      const cases = await casesModel.getCasesByUser(userId);
      if (cases.length > 0) {
        res.status(200).send(cases);
      } else {
        res.status(404).send("This user has no cases");
      }
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).send("Failed to get user");
    }
  },
};
