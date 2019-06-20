const articlesRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const {
  fetchArticlesById,
  postVotesForArticles,
  postComment,
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
  .patch(postVotesForArticles)
  .all(methodNotAllowed);

articlesRouter
  .route("/:articles_id/comments")
  .get(fetchCommentsByArticleId)
  .post(postComment)
  .all(methodNotAllowed);

module.exports = articlesRouter;
