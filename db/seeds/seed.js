const { articlesData, commentsData, topicsData, usersData } = require('../data/index.js');
const { createRef, formatData, formatTime } = require("../../utils/functions");

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() =>
      knex("topics")
        .insert(topicsData)
        .returning("*")
        
    ).then(() => {
      return knex("users")
        .insert(usersData)
        .returning("*")
    }).then(() => {
      return knex("articles")
        .insert(formatTime(articlesData))
        .returning("*")
    }).then((data)=> {
      console.log(data, commentsData)
    })
};
