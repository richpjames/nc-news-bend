const usersRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const { fetchUsers } = require("../controllers/users-controllers");

usersRouter
  .route("/:user_id")
  .get(fetchUsers)
  .all(methodNotAllowed);

module.exports = usersRouter;
