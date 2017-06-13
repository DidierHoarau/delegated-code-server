/* eslint-disable no-unused-vars */

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const config = require('../config/config');

chai.use(chaiHttp);

describe('Projects: POST /projects', () => {
  it('should post a new project', done => {
    chai.request(config.server).post('/projects').send({}).end((err, res) => {
      res.should.have.status(201);
      done();
    });
  });
});
