const jwt = require("jsonwebtoken");
const errorHandler = require("../helpers/errorHandler.helper");
const { APP_SECRET } = process.env;

const authMiddleware = (req, res, next) => {
  try {
    const { authorization: auth } = req.headers;
    if (!auth && !auth?.startsWith("Bearer ")) {
      throw Error("unauthorized");
    }
    const token = auth.slice(7);
    req.user = jwt.verify(token, APP_SECRET);
    return next();
  } catch (e) {
    return errorHandler(res, e);
  }
};

module.exports = authMiddleware;
