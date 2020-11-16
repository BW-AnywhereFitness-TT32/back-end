const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");
const classesRouter = require("../classes/classes-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/users", authenticate, usersRouter);
server.use("/api/classes", authenticate, classesRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

// server.use("*", (req, res) => {
//   res.status(404).json({ message: "Route not found!" });
// });

module.exports = server;
