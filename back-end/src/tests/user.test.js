const { User } = require('../database/models');
const Auth = require('../api/auth/jwt');
const { expect } = require('chai');
const Sinon = require("sinon");
const { UserService } = require("../database/services");
const { mockRegisterUser, mockRegisterUserObj } = require('./mocks/user');
const { mockUser, mockError } = require('./mocks/login');
const { UserController } = require('../database/controllers');
const md5 = require('../helpers/md5');
const { res } = require('./mocks/express');

describe('API User unit test', () => {
  describe('#service', () => {
    beforeEach(() => {
      Sinon.stub(User, 'findOne').resolves(null);
      Sinon.stub(Auth, 'createToken').callsFake(() => 'token');
      Sinon.stub(User, 'create').resolves(mockRegisterUserObj);
    });

    afterEach(() => {
      Sinon.restore();
    });

    it('should call the user model to check the user', async () => {
      await UserService.create(...mockRegisterUser);
      expect(User.findOne.calledOnce).to.be.true;
    });

    it('should return an error if the user exists', async () => {
      User.findOne.restore();
      Sinon.stub(User, 'findOne').resolves(mockUser);
      const res = await UserService.create(mockRegisterUser);
      expect(res.code).to.equal(409);
      expect(res.error).to.equal('User already exists');
    });

    it('should call the create helper if the user does not exist', async () => {
      await UserService.create(...mockRegisterUser);
      expect(User.create.calledOnce).to.be.true;
      expect(User.create.calledWith(mockRegisterUserObj.dataValues)).to.be.true;
    });

    it('should call the create token helper', async () => {
      await UserService.create(...mockRegisterUser);
      expect(Auth.createToken.calledOnce).to.be.true;
      expect(Auth.createToken.calledWith(mockRegisterUserObj.dataValues)).to.be.true;
    });

    it('should return the user and token', async () => {
      const res = await UserService.create(...mockRegisterUser);
      expect(res).to.have.property('name');
      expect(res).to.have.property('email');
      expect(res).to.have.property('role');
      expect(res).to.have.property('token');
    });
  });

  describe('#controller', () => {
    const next = Sinon.spy();
    let req = {};
    const { dataValues } = mockRegisterUserObj;

    beforeEach(() => {
      Sinon.stub(UserService, 'create').resolves(mockUser);
      Sinon.stub(md5, 'hash').callsFake((p) => p);
    });

    afterEach(() => {
      Sinon.restore();
    });

    it('should call the md5 helper to hash the password', async () => {
      req.body = dataValues;

      await UserController.create(req, res, next);
      expect(md5.hash.calledOnce).to.be.true;
    });

    it('should call the user service to create the user', async () => {
      req.body = dataValues;

      await UserController.create(req, res, next);
      expect(UserService.create.calledOnce).to.be.true;
      expect(UserService.create.calledWith(...mockRegisterUser)).to.be.true;
    });

    it('should call the next function if the service returns an error', async () => {
      UserService.create.restore();
      Sinon.stub(UserService, 'create').resolves(mockError);

      req.body = dataValues;

      await UserController.create(req, res, next);
      expect(next.calledOnce).to.be.true;
      expect(next.calledWith(mockError)).to.be.true;
    });

    it('should return the user and token', async () => {
      req.body = dataValues;

      await UserController.create(req, res, next);
      expect(res.statusCode).to.equal(201);
      expect(res.data).to.have.property('name');
      expect(res.data).to.have.property('email');
      expect(res.data).to.have.property('role');
      expect(res.data).to.have.property('token');
    });
  });
});