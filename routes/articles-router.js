const articlesRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const {
  fetchArticlesById,
  incrementVotes
} = require("../controllers/articles-controller");

articlesRouter
  .route("/:articles_id")
  .get(fetchArticlesById)
  .patch(incrementVotes)
  .all(methodNotAllowed);

module.exports = articlesRouter;
