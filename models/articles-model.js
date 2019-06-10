const connection = require("../db/connection");

exports.getArticlesById = articleId => {
  return connection("articles")
    .select("articles.*")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .count({ comment_count: "comments.article_id" })
    .where({ "articles.article_id": articleId })
    .returning("*");
};

exports.updateVotes = (article_id, increment, next) => {
  return connection("articles")
    .where({ article_id })
    .increment("votes", increment)
    .returning("*");
};

exports.getAllArticles = (
  { sort_by = "created_at", order = "desc" },
  author,
  topic
) => {
  return connection("articles")
    .select(
      "articles.author",
      "articles.title",
      "articles.article_id",
      "articles.topic",
      "articles.created_at",
      "articles.votes"
    )
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .count({ comment_count: "comments.article_id" })
    .modify(query => {
      if (author) query.where({ "articles.article_id": author });
      if (topic) query.where({ "articles.topic": topic });
    })
    .orderBy(sort_by, order)
    .returning("*");
};

exports.insertComment = (article_id, comment) => {
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
    .orderBy(sort_by, order);
};
