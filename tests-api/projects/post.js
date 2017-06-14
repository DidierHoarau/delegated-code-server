/* eslint-disable no-unused-vars */

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const config = require('../config/config');

chai.use(chaiHttp);

describe('Projects: POST /projects', () => {
  //
  it('should post a new project', done => {
    const data = {
      name: 'test_' + Math.floor(Math.random() * 10000 + 1),
      commands: [
        {
          id: 1,
          command: `npm install\n
        npm run lint`
        },
        {
          id: 2,
          command: `npm install\n
        npm run test`
        }
      ]
    };
    chai.request(config.server).post('/projects').send(data).end((err, res) => {
      res.should.have.status(201);
      done();
    });
  });

  it('should not post the same project multiple times', done => {
    const data = {
      name: 'test_' + Math.floor(Math.random() * 10000 + 1),
      commands: [
        {
          id: 1,
          command: `npm install\n
        npm run lint`
        },
        {
          id: 2,
          command: `npm install\n
        npm run test`
        }
      ]
    };
    chai.request(config.server).post('/projects').send(data).end((err, res) => {
      res.should.have.status(201);
      chai.request(config.server).post('/projects').send(data).end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
  });
});
