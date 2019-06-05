const topicsRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const { fetchTopics } = require("../controllers/topics-controller");

topicsRouter
  .route("/")
  .get(fetchTopics)
  .all(methodNotAllowed);

module.exports = topicsRouter;
