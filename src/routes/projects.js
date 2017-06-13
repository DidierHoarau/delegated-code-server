/**
 * API Endpoint for Project
 */

const projectApi = require("express").Router();
const _ = require("lodash");
const logger = require("../utils/logger");

const LOGTAG = "[api: /projects] ";

projectApi.post("/", (req, res) => {
  logger.log("info", LOGTAG + "POST /projects/");
  if (_.has(req, "query.command")) {
    return res.status(400).json();
  }
  res.status(201).json();
});

projectApi.get("/", (req, res) => {
  logger.log("info", LOGTAG + "GET /");
  res.status(201).json();
});

projectApi.get("/:projectId", (req, res) => {
  const projectId = req.params.projectId;
  logger.log("info", LOGTAG + "GET /" + projectId);
  res.status(200).json();
});

projectApi.delete("/:projectId", (req, res) => {
  const projectId = req.params.projectId;
  logger.log("info", LOGTAG + "DELETE /" + projectId);
  res.status(200).json();
});

module.exports = projectApi;
