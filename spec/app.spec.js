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
  });
});
