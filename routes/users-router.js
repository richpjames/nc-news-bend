const usersRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const { fetchUsersById } = require("../controllers/users-controller");

usersRouter
  .route("/:user_id")
  .get(fetchUsersById)
  .all(methodNotAllowed);

module.exports = usersRouter;
