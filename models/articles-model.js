const connection = require("../db/connection");

exports.getArticlesById = articleId => {
  return connection("articles")
    .select("articles.*")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .count({ comment_count: "comments.article_id" })
    .where({ "articles.article_id": articleId });
};
