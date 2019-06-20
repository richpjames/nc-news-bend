const { getUsersById } = require("../models/users-model");

exports.fetchUsersById = (req, res, next) => {
  const { user_id } = req.params;
  getUsersById(user_id)
    .then(userArr => {
      if (userArr.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No user found for user_id: ${user_id}`
        });
      }
      const user = { ...userArr[0] };
      res.status(200).send({ user: user });
    })
    .catch(err => {
      next(err);
    });
};
