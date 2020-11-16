module.exports = (role) => {
  return function (req, res, next) {
    if (req.decodedJwt.role === role || req.decodedJwt.role === 1) {
      next();
    } else {
      res
        .status(401)
        .json({ message: "you don't have the correct role to do this" });
    }
  };
};
