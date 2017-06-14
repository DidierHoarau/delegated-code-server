/**
 * API Endpoint for Project
 */

const projectApi = require('express').Router();
const _ = require('lodash');
const logger = require('../utils/logger');
const errors = require('../utils/errors');
const projectsStorage = require('../storage/projects');

const LOGTAG = '[api: /projects] ';

/**
 * Define a new project
 */
projectApi.post('/', (req, res) => {
  logger.info(LOGTAG + 'POST /projects/');
  if (!_.has(req, 'body.name')) {
    return errors.getApiResponse(res, LOGTAG, '0003');
  }
  if (!_.has(req, 'body.commands')) {
    return errors.getApiResponse(res, LOGTAG, '0003');
  }
  const newProject = {
    name: req.body.name,
    commands: req.body.commands
  };
  projectsStorage
    .add(newProject)
    .then(newProjectId => {
      logger.info(LOGTAG + 'New project created: ' + newProjectId);
      res.status(201).json({ id: newProjectId });
    })
    .catch(error => {
      errors.getApiResponse(res, LOGTAG, error);
    });
});

projectApi.get('/', (req, res) => {
  logger.info(LOGTAG + 'GET /');
  res.status(201).json();
});

projectApi.get('/:projectId', (req, res) => {
  const projectId = req.params.projectId;
  logger.info(LOGTAG + 'GET /' + projectId);
  res.status(200).json();
});

projectApi.delete('/:projectId', (req, res) => {
  const projectId = req.params.projectId;
  logger.info(LOGTAG + 'DELETE /' + projectId);
  res.status(200).json();
});

module.exports = projectApi;
