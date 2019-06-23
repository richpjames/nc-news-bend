const { apiModel } = require("../models/api-model");

exports.apiController = (req, res, next) => {
  apiModel()
    .then(res => {
      res.status(200).send(endpoints);
    })
    .catch(next);
};
