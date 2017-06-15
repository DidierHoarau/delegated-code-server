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

/**
 * Get the list of projects
 */
projectApi.get('/', (req, res) => {
  logger.info(LOGTAG + 'GET /');
  projectsStorage
    .list()
    .then(projects => {
      logger.info(LOGTAG + 'Project listed: ' + projects.length);
      res.status(200).json(projects);
    })
    .catch(error => {
      errors.getApiResponse(res, LOGTAG, error);
    });
});

/**
 * Get 1 project
 */
projectApi.get('/:projectId', (req, res) => {
  const projectId = req.params.projectId;
  logger.info(LOGTAG + 'GET /' + projectId);
  projectsStorage
    .get(projectId)
    .then(project => {
      logger.info(LOGTAG + 'Project returned');
      res.status(200).json(project);
    })
    .catch(error => {
      errors.getApiResponse(res, LOGTAG, error);
    });
});

/**
 * Delete 1 project
 */
projectApi.delete('/:projectId', (req, res) => {
  const projectId = req.params.projectId;
  logger.info(LOGTAG + 'DELETE /' + projectId);
  projectsStorage
    .delete(projectId)
    .then(project => {
      logger.info(LOGTAG + 'Project deleted: ' + projectId);
      res.status(200).json(project);
    })
    .catch(error => {
      errors.getApiResponse(res, LOGTAG, error);
    });
});

module.exports = projectApi;
