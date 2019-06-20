const { removeComment, updateVotes } = require("../models/comments-model");

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  removeComment(comment_id)
    .then(comment => {
      if (comment.length === 0) {
        return Promise.reject({ status: 404, msg: "comment not found" });
      } else res.status(204).send({ comment });
    })
    .catch(next);
};
exports.postVotesForComments = (req, res, next) => {
  const increment = req.body.inc_votes;
  const { comment_id } = req.params;
  updateVotes(comment_id, increment)
    .then(commentInArray => {
      const [comment] = commentInArray;
      if (comment.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No comment found for comment_id: ${comment_id}`
        });
      }
      res.status(200).send({ comment });
    })
    .catch(next);
};
