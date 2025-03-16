const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: "localhost",
      database: process.env.NAME_DB,
      user: "root",
      password: process.env.PASSWORDD_DB,
    },
  },
};
