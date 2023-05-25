// Update with your config settings.
require("dotenv").config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "tapir",
      user: "lisa",
    },
    migrations: {
      directory: __dirname + "/db/migrations",
    },
  },

  production: {
    client: "pg",
    connection: process.env.DB_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + "/db/migrations",
    },
  },
};
