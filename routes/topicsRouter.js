const topicsRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const { fetchTopics } = require('../controllers/fetch-topics');

topicsRouter
	.route('/')
	.get(fetchTopics)
	.all(methodNotAllowed);

module.exports = topicsRouter;
