/**
 * Project executions
 */

const logger = require("../utils/logger");

const LOGTAG = "[models: projects-executions] ";

class ProjectsExecutions {
  list() {
    logger.log("info", LOGTAG + "Listing executions");
  }

  get(execId) {
    logger.log("info", LOGTAG + "Getting " + execId);
  }

  cancel(execId) {
    logger.log("info", LOGTAG + "Deleting " + execId);
  }
}

module.exports = new ProjectsExecutions();
