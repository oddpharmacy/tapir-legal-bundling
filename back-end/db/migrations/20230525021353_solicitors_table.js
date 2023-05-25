/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("solicitors", function (table) {
    table.increments("id").primary();
    table.string("party").notNullable();
    table.string("name").notNullable();
    table.integer("cases_id").references("cases.id").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("solicitors");
};
