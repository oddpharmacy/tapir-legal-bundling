/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("cases").del();
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      username: "lisa",
      password: "123",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};
