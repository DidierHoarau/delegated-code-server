const config = require('./config/config');
const logger = require('./utils/logger');
const fse = require('fs-extra');

const LOGTAG = '[app-init] ';

module.exports = {
  execute: () => {
    return new Promise((resolve, reject) => {
      logger.info(LOGTAG + 'Starting initialization');
      fse
        .ensureDir(config.get().folders.projectDefinitions)
        .then(() => {
          logger.info(LOGTAG + 'Initialization completed');
          resolve();
        })
        .catch(error => {
          logger.info(LOGTAG + 'Error during initialization: ' + error);
          reject(error);
        });
    });
  }
};
