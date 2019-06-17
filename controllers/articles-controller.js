const {
  getArticlesById,
  updateVotes,
  getAllArticles,
  insertComment,
  getCommentsByArticleId
} = require("../models/articles-model");

exports.fetchArticlesById = (req, res, next) => {
  const { articles_id } = req.params;
  getArticlesById(articles_id)
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No article found for article_id: ${articles_id}`
        });
      }
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.sendVotes = (req, res, next) => {
  const increment = req.body.inc_votes;
  const { articles_id } = req.params;
  if (increment > 0) {
    updateVotes(articles_id, increment)
      .then(article => {
        if (article.length === 0) {
          return Promise.reject({
            status: 404,
            msg: `No article found for article_id: ${articles_id}`
          });
        }
        res.status(200).send({ article });
      })
      .catch(next);
  }
};

exports.sendComment = (req, res, next) => {
  const comment = req.body;
  const { articles_id } = req.params;
  insertComment(articles_id, comment)
    .then(commentInArray => {
      const [comment] = commentInArray;
      if (comment.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No article found for article_id: ${articles_id}`
        });
      }
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.fetchCommentsByArticleId = (req, res, next) => {
  const { articles_id } = req.params;
  getCommentsByArticleId(articles_id, req.query)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.fetchAllArticles = (req, res, next) => {
  getAllArticles(req.query)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
