const { apiModel } = require("../models/api-model");
const endpoints = require("../endpoints.json");

exports.apiController = (req, res, next) => {
  res.status(200).json({ endpoints });
};
