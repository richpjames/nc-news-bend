const connection = require("../db/connection");

exports.insertComment = (article_id, comment) => {
  console.log(article_id);
  return connection("comments")
    .insert({ author: comment.username, article_id, body: comment.body })
    .returning("*");
};

exports.getCommentsByArticleId = (
  article_id,
  { sort_by = "created_at", order = "desc" }
) => {
  return connection("comments")
    .select("*")
    .where({ article_id })
    .modify(query => {
      if (article_id) query.where({ "comments.article_id": article_id });
    })
    .orderBy(sort_by, order);
};

exports.removeComment = comment_id => {
  return connection("comments")
    .select("*")
    .where({ comment_id })
    .del()
    .returning("*");
};

exports.updateVotes = (comment_id, increment) => {
  return connection("comments")
    .where({ comment_id })
    .increment("votes", increment)
    .returning("*");
};
