const connection = require("../db/connection");

exports.getUsers = userId => {
  return connection("users")
    .where({ username: userId })
    .select("*");
};
