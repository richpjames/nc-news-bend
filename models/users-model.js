const connection = require("../db/connection");

exports.getUsersById = userId => {
  return connection("users")
    .where({ username: userId })
    .select("*");
};
