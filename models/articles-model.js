const connection = require("../db/connection");

exports.getArticlesById = articleId => {
  return connection("articles")
    .select("articles.*")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .count({ comment_count: "comments.article_id" })
    .where({ "articles.article_id": articleId });
};

exports.updateVotes = (article_id, increment, next) => {
  return connection("articles")
    .where({ article_id })
    .increment("votes", increment)
    .returning("*");
};

exports.insertComment = (article_id, comment) => {
  return connection("comments")
    .where({ article_id })
    .insert({ author: comment.username, body: comment.body })
    .returning("*");
};
