// REST API
const app = require('express')();
const routes = require('./routes');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const config = require('./config/config');
const jwt = require('express-jwt');
const logger = require('./utils/logger');

const LOGTAG = '[app] ';

// Parse JSON
app.use(bodyParser.json());

// JWT
app.use(
  jwt({
    secret: config.auth.secret,
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring(req) {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
      }
      return null;
    }
  })
);

//  Connect all our routes to our application
app.use('/', routes);

// Turn on that server!
app.listen(PORT, () => {
  logger.log('info', LOGTAG + 'App listening on port ' + PORT);
});
