const { User } = require('../database/models/');
const { LoginService } = require('../database/services/');
const { expect } = require('chai');
const Sinon = require('sinon');
const { mockFindOne, mockUser, mockReqBody, mockError } = require('./mocks/login');
const Auth = require('../api/auth/jwt');
const { LoginController } = require('../database/controllers/');
const { res } = require('./mocks/express');
const md5 = require('../helpers/md5');

describe('API Login unit test', () => {
  describe('#service', () => {
    beforeEach(() => {
      Sinon.stub(User, 'findOne').callsFake(async (p) => await mockFindOne(p));
      Sinon.stub(Auth, 'createToken').callsFake(() => 'token');
    });
    
    afterEach(() => {
      Sinon.restore();
    });

    it('should call the user model to find the user', async () => {
      await LoginService.login();
      expect(User.findOne.calledOnce).to.be.true;
    });

    it('should return an error if the user is not found', async () => {
      const res = await LoginService.login();
      expect(res.code).to.equal(404);
      expect(res.error).to.equal('User not found');
    });

    it('should call the createToken helper if the user is found', async () => {
      await LoginService.login('valid@mail.com', 'validPassword');
      expect(Auth.createToken.calledOnce).to.be.true;
    });

    it('should return the user and token if the user is found', async () => {
      const res = await LoginService.login('valid@mail.com', 'validPassword');
      expect(res).to.have.property('name');
      expect(res).to.have.property('email');
      expect(res).to.have.property('role');
      expect(res).to.have.property('token');
    });
  });

  describe('#controller', () => {
    const next = Sinon.spy();
    let req = {};

    beforeEach(() => {
      Sinon.stub(LoginService, 'login').callsFake(async () => mockUser);
      Sinon.stub(md5, 'hash').callsFake((p) => p);
    });

    afterEach(() => {
      Sinon.restore();
    });

    it('should call the md5 helper to hash the password', async () => {
      req.body = mockReqBody;

      await LoginController.login(req, res, next);
      expect(md5.hash.calledOnce).to.be.true;
    });

    it('should call the login service to login the user', async () => {
      req.body = mockReqBody;

      await LoginController.login(req, res, next);
      expect(LoginService.login.calledOnce).to.be.true;
    });

    it('should call the next function if the service returns an error', async () => {
      LoginService.login.restore();
      Sinon.stub(LoginService, 'login').resolves(mockError);

      req.body = mockReqBody;

      await LoginController.login(req, res, next);
      expect(next.calledOnce).to.be.true;
      expect(next.calledWith(mockError)).to.be.true;
    });

    it('should return the user and token if the service returns a user', async () => {
      req.body = mockReqBody;

      await LoginController.login(req, res, next);
      expect(res.statusCode).to.equal(200);
      expect(res.data).to.have.property('name');
      expect(res.data).to.have.property('email');
      expect(res.data).to.have.property('role');
      expect(res.data).to.have.property('token');
    });
  });
});