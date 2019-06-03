
const { articles, comments, topics, users } = require('../data/index.js');

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      insert(topics)
      .into("topics")
      .returning("*")
    
    });
};
