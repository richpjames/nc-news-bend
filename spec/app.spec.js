process.env.NODE_ENV = "test";

const { expect } = require("chai");
const request = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

describe.only("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("/api", () => {
    it("GET status:200", () => {
      return request(app)
        .get("/api")
        .expect(200);
    });
    describe("/topics", () => {
      it("GET status: 200 returns an object containing all topic object, each object has a key of slug and description", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(res => {
            expect(res.body.topics).to.be.an("array");
            expect(res.body.topics[0]).to.contain.keys("description", "slug");
          });
      });
    });
    describe("/users", () => {
      it("GET status: 200 returns an object containing a user object which has keys of username, avatar_url and name", () => {
        return request(app)
          .get("/api/users/butter_bridge")
          .expect(200)
          .then(({ body }) => {
            expect(body).to.be.an("array");
            expect(body[0]).to.contain.keys("username", "avatar_url", "name");
          });
      });
      it("GET for an invalid user_id - status:404 and error message", () => {
        return request(app)
          .get("/api/users/notAnID")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("No user found for user_id: notAnID");
          });
      });
    });
    describe("/articles", () => {
      describe("GET requests", () => {
        it("status: 200 returns an object containing the correct properties and comment_count", () => {
          return request(app)
            .get("/api/articles/2")
            .expect(200)
            .then(({ body }) => {
              expect(body).to.be.an("object");
              expect(body).to.contain.keys(
                "author",
                "title",
                "article_id",
                "body",
                "topic",
                "created_at",
                "votes",
                "comment_count"
              );
            });
        });
        it("status: 404 for an invalid article_id - status:404 and error message", () => {
          return request(app)
            .get("/api/articles/0")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("No article found for article_id: 0");
            });
        });
        it("status: 400 for an bad request article_id - status:400 and error message", () => {
          return request(app)
            .get("/api/articles/not!An!ID")
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad request - incorrect input type");
            });
        });
      });
      describe("PATCH request", () => {
        it("status: 200 is able to increment votes on an article, given it's article_id, by specified amount and responds with the updated object", () => {
          return request(app)
            .patch("/api/articles/2")
            .expect(200)
            .send({ inc_votes: 1 })
            .then(({ body }) => {
              expect(body.votes).to.equal(1);
              expect(body).to.contain.keys(
                "author",
                "title",
                "article_id",
                "body",
                "topic",
                "created_at",
                "votes"
              );
            });
        });
        it("status: 404 for an invalid article_id - status:404 and error message", () => {
          return request(app)
            .patch("/api/articles/0")
            .send({ inc_votes: 1 })
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("No article found for article_id: 0");
            });
        });
        it("status: 400 for an bad request article_id - status:400 and error message", () => {
          return request(app)
            .patch("/api/articles/not!An!ID")
            .send({ inc_votes: 1 })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad request - incorrect input type");
            });
        });
        it("status: 400 for an bad request inc votes by a string - invalid input - status:400 and error message", () => {
          return request(app)
            .patch("/api/articles/2")
            .send({ inc_votes: "brian" })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad request - incorrect input type");
            });
        });
        describe.only("/comments", () => {
          describe("POST", () => {
            it("status: 200 is able to post a comment and responds with the posted comment", () => {
              return request(app)
                .post("/api/articles/2/comments")
                .send({
                  body:
                    "if you like sprints and katas your should check out Northcoders :P",
                  username: "lurker"
                })
                .expect(201)
                .then(({ body }) => {
                  expect(body.comment[0]).to.contain.keys(
                    "author",
                    "comment_id",
                    "article_id",
                    "author",
                    "body",
                    "created_at",
                    "votes"
                  );
                  expect(body.comment[0].body).to.equal(
                    "if you like sprints and katas your should check out Northcoders :P"
                  );
                });
            });
          });
        });
      });
    });
  });
});
