process.env.NODE_ENV = "test";
const chai = require("chai");
const { expect } = require("chai");
const request = require("supertest");
chai.use(require("chai-sorted"));
const app = require("../app");
const connection = require("../db/connection");
const articlesData = require("../db/data/test-data/articles");

describe("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("/api", () => {
    it("GET status:200", () => {
      return request(app)
        .get("/api")
        .expect(200);
    });
    it("GET status: 404 - path not found", () => {
      return request(app)
        .get("/123124/askhdjasdj")
        .expect(404);
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
      describe("GET request by Id", () => {
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
        it("status: 400 for a bad request article_id - status:400 and error message", () => {
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
      describe("GET request", () => {
        it("status: 200 returns an array of article objects and sorts by date and ordered in descending order (default)", () => {
          return request(app)
            .get("/api/articles/")
            .expect(200)
            .then(({ body }) => {
              expect(body.articles[0]).to.contain.keys(
                "author",
                "title",
                "article_id",
                "topic",
                "created_at",
                "votes",
                "comment_count"
              );
              expect(body.articles).to.be.sorted("created_at", {
                descending: "true"
              });
            });
        });
        it("status: 200 returns an array of article objects and sorts by author and ordered in descending order ", () => {
          return request(app)
            .get("/api/articles?sort_by=author")
            .expect(200)
            .then(({ body }) => {
              expect(body.articles[0]).to.contain.keys(
                "author",
                "title",
                "article_id",
                "topic",
                "created_at",
                "votes",
                "comment_count"
              );
              expect(body.articles).to.be.sorted("author", {
                descending: "true"
              });
            });
        });
        it("status: 200 returns an array of article objects and sorts by author and ordered in ascending order ", () => {
          return request(app)
            .get("/api/articles?sort_by=author&order=asc")
            .expect(200)
            .then(({ body }) => {
              console.log(body);
              expect(body.articles[0]).to.contain.keys(
                "author",
                "title",
                "article_id",
                "topic",
                "created_at",
                "votes",
                "comment_count"
              );
              expect(body.articles).to.be.sorted("author", {
                ascending: "true"
              });
            });
        });
      });
      describe("/articles/comments", () => {
        describe("POST", () => {
          it("status: 200 is able to post a comment and responds with the posted comment", () => {
            return request(app)
              .post("/api/articles/4/comments")
              .send({
                body:
                  "if you like sprints and katas you should check out Northcoders :P",
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
                  "if you like sprints and katas you should check out Northcoders :P"
                );
              });
          });
          it("status: 404 for an invalid article_id and error message", () => {
            return request(app)
              .post("/api/articles/0/comments")
              .send({
                body:
                  "if you like sprints and katas you should check out Northcoders :P",
                username: "lurker"
              })
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).to.equal("Bad request - incorrect input type");
              });
          });
          it("status: 400 for an bad request article_id - status:400 and error message", () => {
            return request(app)
              .post("/api/articles/not!An!ID/comments")
              .send({
                body:
                  "if you like sprints and katas you should check out Northcoders :P",
                username: "lurker"
              })
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).to.equal("Bad request - incorrect input type");
              });
          });
        });
        describe.only("GET", () => {
          it("status: 200 retrieves all comments for a given article sorted by created_at in descending order (default)", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=created_at")
              .expect(200)
              .then(({ body }) => {
                console.log(body)
                expect(body).to.be.an("object");
                expect(body.comments[0]).to.contain.keys(
                  "comment_id",
                  "author",
                  "created_at",
                  "votes",
                  "body"
                );
                expect(body.comments).to.be.sorted("created_at", {
                  descending: "true"
                });
              });
          });
          it("status: 200 retrieves all comments for a given article sorted by votes in ascending", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=votes&order=asc")
              .expect(200)
              .then(({ body }) => {
                expect(body).to.be.an("object");
                expect(body.comments[0]).to.contain.keys(
                  "comment_id",
                  "author",
                  "created_at",
                  "votes",
                  "body"
                );
                expect(body.comments).to.be.sorted("created_at", {
                  descending: "true"
                });
              });
          });
        });
      });
    });
  });

  describe("/comments", () => {
    describe("PATCH", () => {
      it("status: 200 able to increment votes by patching with a inc_votes object and returns comment object", () => {
        return request(app)
          .patch("/api/comments/1")
          .send({ inc_votes: 1 })
          .expect(200)
          .then(({ body }) => {
            expect(body.comment[0].votes).to.equal(17);
            expect(body.comment[0]).to.have.keys(
              "comment_id",
              "author",
              "article_id",
              "votes",
              "created_at",
              "body"
            );
          });
      });
      it("status: 404 not found", () => {
        return request(app)
          .patch("/api/comments/0")
          .send({ inc_votes: 1 })
          .expect(404);
      });
      it("status: 400 bad request", () => {
        return request(app)
          .patch("/api/comments/Not!An!Id")
          .send({ inc_votes: 1 })
          .expect(400);
      });
    });
    describe("DELETE", () => {
      it("status: 204 can delete comments by comment id", () => {
        return request(app)
          .delete("/api/comments/1")
          .expect(204);
      });
      it("status: 404 when comment is not found", () => {
        return request(app)
          .delete("/api/comments/0")
          .expect(404);
      });
      it("status: 400 when comment id is invalid", () => {
        return request(app)
          .delete("/api/comments/Not!An!Id")
          .expect(400);
      });
    });
  });
});
