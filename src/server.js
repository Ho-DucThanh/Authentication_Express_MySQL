const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const PORT = 3000;

// import routes
const router = require("./Router/index.routes");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(cookieParser());

// Routes
server.use("/", router);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
