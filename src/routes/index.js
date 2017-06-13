const routes = require("express").Router();
const projects = require("./projects");
const projectsExecutions = require("./projects-executions");

// CORS
routes.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

routes.use("/projects", projects);
routes.use("/projects-executions", projectsExecutions);

"/", (req, res) => {
  res.status(200).json({ message: "Connected!" });
};

module.exports = routes;
