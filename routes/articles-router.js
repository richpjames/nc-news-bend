const articlesRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const {
  fetchArticlesById,
  sendVotes,
  sendComment,
  fetchCommentsByArticleId,
  fetchAllArticles
} = require("../controllers/articles-controller");

articlesRouter
  .route("/")
  .get(fetchAllArticles)
  .all(methodNotAllowed);

articlesRouter
  .route("/:articles_id")
  .get(fetchArticlesById)
  .patch(sendVotes)
  .all(methodNotAllowed);

articlesRouter
  .route("/:articles_id/comments")
  .get(fetchCommentsByArticleId)
  .post(sendComment)
  .all(methodNotAllowed);

module.exports = articlesRouter;
