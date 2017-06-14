const appApi = require('./app-api');
const appInit = require('./app-init');
const logger = require('./utils/logger');

const LOGTAG = '[app] ';

logger.info(LOGTAG + '******** Application Starting ********');

appInit
  .execute()
  .then(() => {
    logger.info(LOGTAG + 'Application initialized');
    appApi.start();
  })
  .catch(error => {
    logger.error(LOGTAG + 'ERROR STARTING APPLICATION: ' + error);
  });
