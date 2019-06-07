const commentsRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const {
  deleteComment,
  sendVotes
} = require("../controllers/comments-controller");

commentsRouter
  .route("/:comment_id")
  .patch(sendVotes)
  .delete(deleteComment)
  .all(methodNotAllowed);

module.exports = commentsRouter;
