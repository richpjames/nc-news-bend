const connection = require("../db/connection");

exports.removeComment = comment_id => {
  return connection("comments")
    .select("*")
    .where({ comment_id })
    .del()
    .returning("*");
};

exports.updateVotes = (comment_id, increment = 0) => {
  return connection("comments")
    .where({ comment_id })
    .increment("votes", increment)
    .returning("*");
};
