const userService = require("../Service/user.service");
const { successResponse, errorResponse } = require("../Utils/respone.util");
const bcrypt = require("bcryptjs");

module.exports.getAll = async (req, res) => {
  try {
    let users = await userService.getAll();
    return successResponse(res, 200, "Get all users successfully", users);
  } catch (err) {
    return errorResponse(res, 500, err);
  }
};
module.exports.getOne = async (req, res) => {
  let id = req.params.id;
  try {
    let user = await userService.getOneById(id);
    if (!user) return errorResponse(res, 404, "User not found");
    return successResponse(res, 200, "Get one user successfully", user);
  } catch (err) {
    return errorResponse(res, 500, err);
  }
};
module.exports.createOne = async (req, res) => {
  let { email, password } = req.body;
  try {
    let checkUserExit = await userService.getOne(email);
    if (checkUserExit) return errorResponse(res, 400, "Email already exists");

    let [id] = await userService.createOne(email, password);
    return successResponse(res, 200, "Create one user successfully", { id });
  } catch (err) {
    return errorResponse(res, 500, err);
  }
};
module.exports.updateOne = async (req, res) => {
  let id = req.params.id;
  let { email, password } = req.body;
  try {
    let checkUserExit = await userService.getOneById(id);
    if (!checkUserExit) return errorResponse(res, 404, "User not found");

    let updateData = {};
    if (email) updateData.email = email;
    if (password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      updateData.password = hash;
    }

    await userService.updateOne(id, updateData);
    return successResponse(res, 200, "Update one user successfully", { id });
  } catch (err) {
    return errorResponse(res, 500, err);
  }
};
module.exports.deleteOne = async (req, res) => {
  let id = req.params.id;
  try {
    let checkUserExit = await userService.getOneById(id);
    if (!checkUserExit) return errorResponse(res, 404, "User not found");

    await userService.deleteOne(id);
    return successResponse(res, 200, "Delete one user successfully", { id });
  } catch (err) {
    return errorResponse(res, 500, err);
  }
};
