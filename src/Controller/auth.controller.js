const authService = require("../Service/auth.service");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { successResponse, errorResponse } = require("../Utils/respone.util");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../Utils/generateToken");

dotenv.config();
module.exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    let [id] = await authService.register(email, password);

    return successResponse(res, 201, "Created User Succesfully", {
      id,
    });
  } catch (err) {
    return errorResponse(res, 400, err);
  }
};

let refreshTokens = [];
module.exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let { userData, accessToken, refreshToken } = await authService.signin(
      email,
      password
    );

    refreshTokens.push(refreshToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return successResponse(res, 200, "Login successful", {
      userData,
      accessToken,
    });
  } catch (err) {
    return errorResponse(res, 401, err);
  }
};

module.exports.logout = (req, res) => {
  try {
    res.clearCookie("refreshToken");
    return successResponse(res, 200, "Logout successful");
  } catch (err) {
    return errorResponse(res, 500, err);
  }
};

module.exports.refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return errorResponse(res, 401, "User not authenticated");

  if (!refreshTokens.includes(refreshToken)) {
    return errorResponse(res, 403, "Invalid refresh token");
  }

  try {
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET_KEY,
      (err, user) => {
        if (err) return errorResponse(res, 403, "Forbidden", err);

        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

        const accessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        refreshTokens.push(newRefreshToken);
        
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        });
        return successResponse(res, 200, "Token refreshed", {
          accessToken,
          newRefreshToken,
        });
      }
    );
  } catch (err) {
    return errorResponse(res, 500, err);
  }
};
