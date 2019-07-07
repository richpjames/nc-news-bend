# NC News Backend.

This repo serves as a RESTful API for my NC News Frontend. It is hosted [here](https://rich-james-nc-news.herokuapp.com/api/). The site can also be found [here](https://rich-nc-news.netlify.com/)

Northcoders News is a social news aggregation, web content rating, and discussion website. Think something along the lines of [Reddit](https://www.reddit.com/). Northcoders News has articles which are divided into topics. Each article has user curated ratings and can be up or down voted using the API. Users can also add comments about an article. Comments can also be up or down voted. A user can add comments and remove any comments which they have added.

## Prerequisites

First ensure you have [Node.js](https://nodejs.org/en/) and [PostgreSQL](https://www.postgresql.org/) installed.

## Getting Started

First ensure you have Node.js and PostgreSQL installed. If you would like to run this repo on your own machine then feel free to clone it. Make sure you have postgres installed and running, then run `npm install` to install dependencies.

For testing and development, you will need your own _knexfile.js_, make sure you add this to your _.gitignore_ file. Here's what it should look like:

```
const ENV = process.env.NODE_ENV || 'development';
const { DB_URL } = process.env;

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};

const customConfigs = {
  development: {
    connection: {
      database: 'nc_news',
      // username: "" << linux users only
      // password: "" << linux users only
    },
  },
  test: {
    connection: {
      database: 'nc_news_test',
      // username: "", << linux users only
      // password: "", << linux users only
    },
  },
  production: {
    connection: `${DB_URL}?ssl=true`,
  },
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };
```

To seed the databse run `npm run seed`.

Then run the application by running `npm run dev`, this will start up the local server.

Once the local server is up and running navigate your browser to localhost:9090/api.
This endpoint describes all the other available endpoints of the API.

## Running the tests

To run tests type and run `npm test` in the terminal when in the repo. This will run tests using the [Mocha](https://mochajs.org/) test framework, [Chai](https://www.chaijs.com/) assertion library and the [Supertest](https://github.com/visionmedia/supertest) HTTP server testing library. First the API endpoints are tested followed by the utility functions neccessary for seeding the data.

## Built With

- [Express](https://expressjs.com/) - The web framework used

## API Routes

#### GET

`/api`
Serves a json object representing all the available endpoints of the API

`/api/topics`
Serves an array of all topics

`/api/articles`
Serves an array of all articles

`/api/users/:username`
Responds with a a user object with details about the given user

`/api/articles/:article_id`
Responds with an article object for the given article ID

`/api/articles/:article_id/comments`
When given a valid article ID, responds with an array of comments for that article

#### PATCH

`/api/articles/:article_id`
Accepts an object in the form of `{ inc_votes: newVote}` and responds with the updated article

`/api/comments/:comment_id`
Accepts an object in the form of `{ inc_votes: newVote}` and responds with the updated comment

#### POST

`/api/articles/:article_id/comments`
Request body accepts an object in the form of `{username: 'someusername', body: 'some body'}` and responds with the posted comment

#### DELETE

`/api/comments/:comment_id`
Deletes the comment given by comment_id and responds with status 204

## Acknowledgments

- Northcoders
