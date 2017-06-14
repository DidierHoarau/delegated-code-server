/**
 * Error Management
 */

const _ = require('lodash');
const logger = require('./logger');
const ERRORCODE_FORMAT = new RegExp('\\d\\d\\d\\d');

const errors = [
  { code: '0000', http: 400, message: 'Unexpected error' },
  { code: '0403', http: 403, message: 'Permission denied' },
  { code: '0404', http: 404, message: 'API not found' },
  { code: '0003', http: 400, message: 'Missing parameters' },
  { code: '0004', http: 400, message: 'Wrong value for parameters' },
  { code: '0005', http: 400, message: 'Record not found' },
  { code: '0006', http: 500, message: 'Data access issue' },
  { code: '0007', http: 400, message: 'Conflict of data' }
];

module.exports = {
  getApiResponse: function(res, tag, errorIn) {
    let code = '0000';
    let message = '';
    let args;
    let displayMessage = '';
    if (_.isObject(errorIn)) {
      if (_.has(errorIn, 'code')) {
        code = errorIn.code;
        if (_.has(errorIn, 'message')) {
          message = errorIn.message;
          displayMessage = ' ' + message;
        }
        if (_.has(errorIn, 'args')) {
          args = errorIn.args;
          displayMessage += ' - ' + args;
        }
      } else if (_.has(errorIn, 'message') && ERRORCODE_FORMAT.test(errorIn.message)) {
        code = errorIn.message;
      }
    } else if (_.isString(errorIn) && ERRORCODE_FORMAT.test(errorIn)) {
      code = errorIn;
    }

    const errorOut = _.clone(_.find(errors, { code }));
    logger.error(tag + 'code: ' + errorOut.code + ' - ' + errorOut.message + displayMessage);
    return res.status(errorOut.http).json(errorOut);
  }
};
