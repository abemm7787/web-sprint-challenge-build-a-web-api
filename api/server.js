const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());

const projectsRouter = require("./projects/projects-router.js");
const actionsRouter = require("./actions/actions-router")
server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter)

server.get("*", (req, res) => {
  res.send(`<h3> Path not found</h3>`);
});

module.exports = server;
