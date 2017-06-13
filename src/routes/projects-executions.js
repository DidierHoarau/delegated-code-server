/**
 * API Endpoint for project executions
 */

// Libs
const projectApi = require("express").Router();
const _ = require("lodash");
const logger = require("../utils/logger");

// Init
const LOGTAG = "[api: /projects/executions] ";

projectApi.post("/", (req, res) => {
  logger.log("info", LOGTAG + "POST /");
  if (_.has(req, "query.command")) {
    return res.status(400).json();
  }
  res.status(201).json();
});

projectApi.get("/:execId/status", (req, res) => {
  const execId = req.params.execId;
  logger.log("info", LOGTAG + "GET /" + execId + "/status");
  res.status(200).json();
});

projectApi.get("/:execId/result", (req, res) => {
  const execId = req.params.execId;
  logger.log("info", LOGTAG + "GET /" + execId + "/status");
  res.status(200).json();
});

module.exports = projectApi;
