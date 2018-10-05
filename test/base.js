/* eslint-env node, mocha */

// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

chai.should();

chai.use(chaiHttp);

describe('/GET pid', () => {
  it('it should the pid', (done) => {
    chai.request(server)
      .get('/pid')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
