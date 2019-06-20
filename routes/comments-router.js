const commentsRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const {
  deleteComment,
  postVotesForComments
} = require("../controllers/comments-controller");

commentsRouter
  .route("/:comment_id")
  .patch(postVotesForComments)
  .delete(deleteComment)
  .all(methodNotAllowed);

module.exports = commentsRouter;
