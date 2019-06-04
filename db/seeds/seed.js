const { articlesData, commentsData, topicsData, usersData } = require('../data/index.js');
const { createRef, formatData, formatTime, changeKeys } = require('../../utils/functions');

exports.seed = (knex, Promise) => {
	return knex.migrate
		.rollback()
		.then(() => knex.migrate.latest())
		.then(() =>
			knex('topics')
				.insert(topicsData)
				.returning('*')
		)
		.then(() => {
			return knex('users')
				.insert(usersData)
				.returning('*');
		})
		.then(() => {
			return knex('articles')
				.insert(formatTime(articlesData))
				.returning('*');
		})
		.then(articles => {
			const articlesRefObj = createRef(articles, 'title', 'article_id');
			const ArrWithArticleId = formatData(commentsData, articlesRefObj, 'belongs_to', 'article_id');
			const dataWithAuthorKey = changeKeys(ArrWithArticleId, 'created_by', 'author');
			return knex('comments')
				.insert(formatTime(dataWithAuthorKey))
				.returning('*');
		});
};
