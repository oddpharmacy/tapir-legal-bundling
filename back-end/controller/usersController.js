const bcrypt = require("bcrypt");
const userModel = require("../model/users");

module.exports = {
  async createUser(req, res) {
    try {
      const user = await userModel.createUser(req.body);
      res.status(201).send(user);
    } catch (error) {
      console.log("Error: ", error);
      res.status(409).send("Failed to create new user");
    }
  },

  async getUser(req, res) {
    try {
      const user = await userModel.getUser(req.body);
      const dbPassword = user[0].password;
      const userInputPassword = req.body.password;
      console.log("userinput ", userInputPassword);
      console.log("dbPassword ", dbPassword);
      const checkIfValidPassword = await bcrypt.compare(
        userInputPassword,
        dbPassword
      );
      checkIfValidPassword
        ? res.status(200).send(user)
        : res.status(404).send("Incorrect Username/Password");
    } catch (error) {
      console.log("Error: ", error);
    }
  },
};
