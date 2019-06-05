const { getArticlesById } = require("../models/articles-model");
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
      res.status(200).send(article);
    })
    .catch(next);
};
