const db = require("../Config/db");
module.exports.getAll = async () => {
  return await db("user").select("*");
};
module.exports.getOne = async (email) => {
  return await db("user").where("email", email).first();
};

module.exports.getOneById = async (id) => {
  return await db("user").where("id", id).first();
};
module.exports.createOne = async (email, password) => {
  return await db("user").insert({
    email: email,
    password: password,
  });
};
module.exports.updateOne = async (id, updateData) => {
  return await db("user").where("id", id).update(updateData);
};
module.exports.deleteOne = async (id) => {
  return await db("user").where("id", id).del();
};
