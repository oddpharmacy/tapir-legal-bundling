const knex = require("../db/knex");
const bcrypt = require("bcrypt");

module.exports = {
  async createUser(user) {
    const { username, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userDetails = await knex("users")
      .insert({
        username: username,
        password: hashedPassword,
      })
      .returning(["id", "username"]);
    return userDetails;
  },

  async getUser(user) {
    const { username } = user;
    const userDetails = await knex("users")
      .select("username", "password")
      .from("users")
      .where("username", username)
      .returning(["id", "password"]);
    return userDetails;
  },
};
