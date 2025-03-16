const bcrypt = require("bcryptjs");
const userService = require("../Service/user.service");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../Utils/generateToken");

module.exports.register = async (email, password) => {
  let userExit = await userService.getOne(email);
  if (userExit) {
    throw new Error("Email already exists: ");
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return await userService.createOne(email, hash);
};

module.exports.signin = async (email, password) => {
  let user = await userService.getOne(email);
  if (!user) {
    throw new Error(`User with email ${email} not existed`);
  }

  let passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    throw new Error("Password is incorrect");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    userData: {
      id: user.id,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
};
