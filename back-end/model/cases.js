const knex = require("../db/knex");

module.exports = {
  async createCase(userId, caseNumber) {
    const newCase = await knex("cases")
      .insert({
        user_id: userId,
        case_number: caseNumber,
      })
      .returning(["id"]);
    return newCase;
  },

  async createAppellants(caseId, appellants) {
    const allAppellants = appellants.map((appellant) => ({
      name: appellant,
      cases_id: caseId,
    }));
    return await knex("appellants").insert(allAppellants);
  },

  async createRespondents(caseId, respondents) {
    const allRespondents = respondents.map((respondent) => ({
      name: respondent,
      cases_id: caseId,
    }));
    return await knex("respondents").insert(allRespondents);
  },

  async createSolicitors(caseId, solicitors) {
    const allSolicitors = solicitors.map((solicitor) => ({
      name: solicitor.name,
      party: solicitor.party,
      cases_id: caseId,
    }));
    return await knex("solicitors").insert(allSolicitors);
  },

  async getCasesByUser(userId) {
    console.log("userId ", userId);
    const cases = await knex("cases")
      .where("cases.user_id", userId)
      .select("id", "case_number");

    for (const userCase of cases) {
      const appellants = await knex("appellants")
        .where("cases_id", userCase.id)
        .select("name");
      userCase.appellants = appellants;

      const respondents = await knex("respondents")
        .where("cases_id", userCase.id)
        .select("name");
      userCase.respondents = respondents;

      const solicitors = await knex("solicitors")
        .where("cases_id", userCase.id)
        .select("name", "party");
      userCase.solicitors = solicitors;
    }

    return cases;
  },
};
