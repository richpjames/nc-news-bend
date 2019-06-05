const articlesRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const { fetchArticlesById } = require("../controllers/articles-controller");

articlesRouter
  .route("/:articles_id")
  .get(fetchArticlesById)
  .all(methodNotAllowed);

module.exports = articlesRouter;
