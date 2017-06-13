/**
 * Error Management
 */

const _ = require("lodash");
const logger = require("./logger");

const LOGTAG = "[errors] ";

const errors = [
  { code: "0000", http: 400, message: "Unexpected error" },
  { code: "0403", http: 403, message: "Permission denied" },
  { code: "0404", http: 404, message: "API not found" },
  { code: "0003", http: 400, message: "Missing parameters" },
  { code: "0004", http: 400, message: "Wrong value for parameters" },
  { code: "0005", http: 400, message: "Record not found" }
];

module.exports = {
  getFull: function(res, tag, errorIn) {
    let code = "0000";
    let message = "";
    let args;
    let displayMessage = "";
    if (_.isObject(errorIn)) {
      if (_.has(errorIn, "code")) {
        code = errorIn.code;
      }
      if (_.has(errorIn, "message")) {
        message = errorIn.message;
        displayMessage = " " + message;
      }
      if (_.has(errorIn, "args")) {
        args = errorIn.args;
        displayMessage += " - " + args;
      }
    } else {
      message = errorIn;
    }

    const errorOut = _.clone(_.find(errors, { code }));
    logger.log("error", LOGTAG + "code: " + errorOut.code + " - " + errorOut.message + displayMessage);
    return res.status(errorOut.http).json(errorOut);
  },

  get: function(code, args) {
    if (!code) {
      code = "0000";
    }
    const error = _.find(errors, { code });
    let tmpMessage = "";
    if (args) {
      error.args = args;
      tmpMessage = " - " + args;
    }
    logger.log("error", LOGTAG + "code: " + error.code + " - " + error.message + tmpMessage);
    return error;
  }
};
