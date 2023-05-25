/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("cases").del();
  await knex("cases").insert([
    {
      id: 1,
      user_id: "1",
      case_number: "W-02(IM)(NCC)-test-2020",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};
