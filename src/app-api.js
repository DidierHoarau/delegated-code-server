// REST API
const app = require('express')();
const routes = require('./routes');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const config = require('./config/config');
const jwt = require('express-jwt');
const logger = require('./utils/logger');

const LOGTAG = '[app-api] ';

// Parse JSON
app.use(bodyParser.json());

// JWT
app.use(
  jwt({
    secret: config.get().auth.secret,
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring(req) {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
      }
      return null;
    }
  })
);

app.use('/', routes);

module.exports = {
  start: () => {
    return new Promise(resolve => {
      app.listen(PORT, () => {
        logger.log('info', LOGTAG + 'API listening on port ' + PORT);
        resolve();
      });
    });
  }
};
