// Configure your server here
const express = require("express");

const server = express();

const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");

server.use(express.json());

// Build your actions router in /api/actions/actions-router.js

// Build your projects router in /api/projects/projects-router.js
server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

module.exports = server;
// Do NOT `server.listen()` inside this file!
