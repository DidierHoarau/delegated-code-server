const _ = require('lodash');
const fs = require('fs');

describe('API Tests', () => {
  describe('Projects', () => {
    testFolder('/projects');
  });
});

function testFolder(dir) {
  const testFiles = listJsFiles(__dirname + dir);
  for (const i in testFiles) {
    require(testFiles[i]);
  }
}

function listJsFiles(dir) {
  try {
    let files = [];
    const dirContent = fs.readdirSync(dir);
    for (const i in dirContent) {
      if (_.endsWith(dirContent[i], '.js')) {
        files.push(dir + '/' + dirContent[i]);
      } else if (fs.lstatSync(dir + '/' + dirContent[i])) {
        const subFoldersFiles = listJsFiles(dir + '/' + dirContent[i]);
        files = _.concat(files, subFoldersFiles);
      }
    }
    return files;
  } catch (err) {
    return [];
  }
}
