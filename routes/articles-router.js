const articlesRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const {
  fetchArticlesById,
  sendVotes,
  sendComment
} = require("../controllers/articles-controller");

articlesRouter
  .route("/:articles_id")
  .get(fetchArticlesById)
  .patch(sendVotes)
  .all(methodNotAllowed);

articlesRouter
  .route("/:articles_id/comments")
  .post(sendComment)
  .all(methodNotAllowed);

module.exports = articlesRouter;
