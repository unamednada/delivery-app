const Sinon = require('sinon');
const server = require('../api/server');
const app = require('../api/app');
const { expect } = require('chai');

describe('API Server', () => {
  before(() => {
    Sinon.stub(app, 'listen').callsFake(() => {});
  });

  after(() => {
    Sinon.restore();
  });

  it('should call the app listen', () => {
    server.listen();
    expect(app.listen.calledOnce).to.be.true;
  });
});