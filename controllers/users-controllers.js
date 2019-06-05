const { getUsers } = require("../models/users-model");

exports.fetchUsers = (req, res, next) => {
  const { user_id } = req.params;
  getUsers(user_id)
    .then(user => {
      if (user.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No user found for user_id: ${user_id}`
        });
      }
      res.status(200).send(user);
    })
    .catch(err => {
      next(err);
    });
};
