const express = require("express");
// const tasksRouter = require("./tasks/tasks.router");
// const usersRouter = require("./users/users.router");

const app = express();

app.use(express.json()); // parse json body

app.get("/", (req, res) => {
  res.send("Health Alert blog API");
});

app.get("/health", (req, res) => {
  res.send("OK");
});

// app.use("/api/v1/users", usersRouter);
// app.use("/api/v1/tasks", tasksRouter);

module.exports = app;
