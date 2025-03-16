const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports.generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1m" }
  );
};

module.exports.generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET_KEY, {
    expiresIn: "30m",
  });
};
