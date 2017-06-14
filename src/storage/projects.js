/**
 * Project definition
 */

const logger = require('../utils/logger');
const config = require('../config/config');
const _ = require('lodash');
const fse = require('fs-extra');
const ids = require('../utils/ids');
const path = require('path');

const LOGTAG = '[storage/projects] ';

class ProjectsStorage {
  /**
   * Add a new project definition
   *
   * @param  {Object} newProject {name: string, commands[ {id, command}]}
   * @return {Promise} The promise is resolved with the id of the new project
   */
  add(newProject) {
    return new Promise((resolve, reject) => {
      logger.info(LOGTAG + 'Adding new project');
      const newId = ids.new();
      this.list()
        .then(projects => {
          if (_.find(projects, { name: newProject.name })) {
            logger.error(LOGTAG + 'Name conflict: ' + newProject.name);
            return reject({ code: '0007', args: 'name' });
          }
          const newId = ids.new();
          newProject.id = newId;
          const projectFile = path.join(config.get().folders.projectDefinitions, newId + '.json');
          return fse.writeFile(projectFile, JSON.stringify(newProject));
        })
        .then(() => {
          logger.info(LOGTAG + 'Project added');
          resolve(newId);
        })
        .catch(error => {
          logger.error(LOGTAG + 'Error adding project: ' + error);
          reject(new Error('0006'));
        });
    });
  }

  /**
   * List existing project definitions
   *
   * @return {Promise} The promise is resolved with an array of project
   */
  list() {
    return new Promise((resolve, reject) => {
      const projectList = [];
      logger.info(LOGTAG + 'Listing projects');
      fse
        .readdir(config.get().folders.projectDefinitions)
        .then(files => {
          const getPromises = [];
          _.forEach(files, file => {
            getPromises.push(
              new Promise((resolve2, reject2) => {
                this.get(path.basename(file, '.json'))
                  .then(projectDetail => {
                    projectList.push({ id: projectDetail.id, name: projectDetail.name });
                    resolve2();
                  })
                  .catch(error => {
                    logger.error(LOGTAG + 'Error getting project details: ' + error);
                    reject2(new Error('0006'));
                  });
              })
            );
          });
          return Promise.all(getPromises);
        })
        .then(() => {
          logger.info(LOGTAG + 'Project listed');
          resolve(projectList);
        })
        .catch(error => {
          logger.error(LOGTAG + 'Error listing projects: ' + error);
          reject(new Error('0006'));
        });
    });
  }

  /**
   * Get the content of a project description
   *
   * @param  {string} projectId
   * @return {Promise} The promise returns the project data
   */
  get(projectId) {
    return new Promise((resolve, reject) => {
      logger.info(LOGTAG + 'Getting ' + projectId);
      const projectFile = path.join(config.get().folders.projectDefinitions, projectId + '.json');
      fse
        .readFile(projectFile)
        .then(data => {
          resolve(JSON.parse(data));
        })
        .catch(error => {
          logger.error(LOGTAG + 'Error getting ' + projectId + ': ' + error);
          reject(new Error('0006'));
        });
    });
  }

  delete(projectId) {
    logger.info(LOGTAG + 'Deleting ' + projectId);
  }
}

module.exports = new ProjectsStorage();
