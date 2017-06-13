/**
 * Project definition
 */

const logger = require("../utils/logger");

const LOGTAG = "[models: projects] ";

class Projects {
  list() {
    logger.log("info", LOGTAG + "Listing projects");
  }

  get(projectId) {
    logger.log("info", LOGTAG + "Getting " + projectId);
  }

  delete(projectId) {
    logger.log("info", LOGTAG + "Deleting " + projectId);
  }
}

module.exports = new Projects();
