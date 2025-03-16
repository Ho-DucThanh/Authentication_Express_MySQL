const { registerBody } = require("../Utils/validate-schema");
const { errorResponse } = require("../Utils/respone.util");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
module.exports.validateBody = (req, res, next) => {
  const { email, password } = req.body;
  let { error } = registerBody.validate({ email, password });
  if (error) {
    return errorResponse(res, 400, error);
  } else {
    next();
  }
};

module.exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader?.split(" ")[1] ?? "";
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) return errorResponse(res, 403, "Forbidden", err);
      req.user = user;
      next();
    });
  } else {
    return errorResponse(res, 401, "Invalid access token");
  }
};
