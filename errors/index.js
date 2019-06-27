exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: "Route Not Found" });
};

exports.badRequest = (req, res) => {
  res.status(400).send({ msg: "Bad Request" });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg)
    res.status(err.status).send({
      msg: err.msg
    });
  else next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  const psqlCodes = ["22P02", "23502", "23503", "42703", "22P02"];
  if (psqlCodes.includes(err.code))
    res.status(400).send({
      msg: `Bad request - incorrect input type ${err}`
    });
};
