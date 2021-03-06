const {
  getArticlesById,
  updateVotes,
  getAllArticles,
  insertComment,
  getCommentsByArticleId,
  checkSortByExists
} = require("../models/articles-model");

exports.fetchArticlesById = (req, res, next) => {
  const { articles_id } = req.params;
  getArticlesById(articles_id)
    .then(articleArr => {
      const article = articleArr[0];
      if (articleArr.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No article found for article_id: ${articles_id}`
        });
      }
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.postVotesForArticles = (req, res, next) => {
  let increment = Number(req.body.inc_votes);
  const { articles_id } = req.params;
  if (increment !== -1 && increment !== 1) {
    increment = 0;
  }
  updateVotes(articles_id, increment)
    .then(articleArr => {
      const article = articleArr[0];
      if (articleArr.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No article found for article_id: ${articles_id}`
        });
      } else res.status(200).send({ article });
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

exports.postComment = (req, res, next) => {
  const comment = req.body;
  const { articles_id } = req.params;
  getArticlesById(articles_id)
    .then(response => {
      if (response.length < 1) {
        return Promise.reject({
          status: 404,
          msg: `No article found for article_id: ${articles_id}`
        });
      } else {
       return  insertComment(articles_id, comment)
      }
    }).then(commentInArray => {
      const [comment] = commentInArray;
      res.status(201).send({ comment });
    }).catch(next);
};

exports.fetchAllArticles = (req, res, next) => {
  const { author, topic } = req.query;
  checkSortByExists(author, topic)
    .then(res => {
      if (res.length < 1) {
        return Promise.reject({
          status: 404,
          msg: `No article found for that topic/author`
        });
      } else return getAllArticles(req.query);
    })
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
