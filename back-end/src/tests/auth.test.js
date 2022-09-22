const { expect } = require('chai');
const Auth = require('../api/auth/jwt');
const jwt = require('jsonwebtoken');
const Sinon = require('sinon');
const { res } = require('./mocks/express');

const req = {
  headers: {
    authorization: 'token',
  },
};

describe('Auth unit test', () => {
  beforeEach(() => {
    Sinon.stub(jwt, 'sign').callsFake((p) => p);
    Sinon.stub(jwt, 'verify').callsFake((p) => p);
  });
  
  afterEach(() => {
    Sinon.restore();
  });

  describe('#createToken', () => {
    it('should call the jwt sign to generate the token', () => {
      Auth.createToken({ name: 'test' });
      expect(jwt.sign.calledOnce).to.be.true;
    });

    it('should return the token', () => {
      const token = Auth.createToken({ name: 'test' });
      expect(token).to.have.property('name');
    });
  });

  describe('#authToken', () => {
    const next = Sinon.spy();
    
    it('should call the jwt verify to validate the token', () => {
      Auth.authToken(req, res, next);
      expect(jwt.verify.calledOnce).to.be.true;
    });

    it('should call the next function if the token is valid', () => {
      Auth.authToken(req, res, () => {});
      expect(next.calledOnce).to.be.true;
    });

    it('should return an error if the token is invalid', () => {
      Sinon.restore();
      Sinon.stub(jwt, 'verify').throws(new Error('invalid token'));
      Auth.authToken(req, res, () => {});
      expect(res.statusCode).to.equal(401);
      expect(res.data).to.have.property('error');
      expect(res.data.error).to.equal('Invalid token');
    });

    it('should return an error if the token is not found', () => {
      Auth.authToken({ headers: {} }, res, next);
      expect(res.statusCode).to.equal(401);
      expect(res.data).to.have.property('error');
      expect(res.data.error).to.equal('Token not found');
    });

    // should return the decoded token?
  });
});