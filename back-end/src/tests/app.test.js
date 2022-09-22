const Sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');
const { mockReqBody, mockError, mockUser } = require('./mocks/login');
const {
  LoginController,
  UserController,
  ProductController,
} = require('../database/controllers');
const { mockRegisterUserObj } = require('./mocks/user');

const { expect } = chai;
chai.use(chaiHttp);

describe('API Server test', () => {
  describe('#login', () => {
    beforeEach(() => {
      Sinon.stub(LoginController, 'login').resolves({ token: 'token' });
    });

    afterEach(() => {
      Sinon.restore();
    });
  
    it('should call the login controller', () => {
      chai.request(app)
        .post('/login')
        .send(mockReqBody)
        .end((done) => (_err, _res) => {
          expect(LoginController.login.calledOnce).to.be.true;
          done();
        });
    });

    it('should return an error if the login controller returns an error', () => {
      before(() => {
        Sinon.restore();
        Sinon.stub(LoginController, 'login').resolves(mockError);
      });

      chai.request(app)
        .post('/login')
        .send(mockReqBody)
        .end((done) => (_err, res) => {
          expect(res.status).to.be.equal(401);
          expect(res.body).to.be.deep.equal(mockError);
          done();
        });
    });

    it('should return a token if the login controller returns a token', () => {
      chai.request(app)
        .post('/login')
        .send(mockReqBody)
        .end((done) => (_err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.deep.equal(mockUser);
          done();
        });
    });
  });

  describe('#register', () => {
    const { dataValues } = mockRegisterUserObj;
    beforeEach(() => {
      Sinon.stub(UserController, 'create').callsFake(async () => ({ dataValues }));
    });

    afterEach(() => {
      Sinon.restore();
    });

    it('should call the user controller', () => {
      chai.request(app)
        .post('/register')
        .send(dataValues)
        .end((done) => (_err, _res) => {
          expect(UserController.create.calledOnce).to.be.true;
          done();
        });
    });

    it('should return an error if the user controller returns an error', () => {
      before(() => {
        Sinon.restore();
        Sinon.stub(UserController, 'create').callsFake(async () => mockError);
      });

      chai.request(app)
        .post('/register')
        .send(dataValues)
        .end((done) => (_err, res) => {
          expect(res.status).to.be.equal(401);
          expect(res.body).to.be.deep.equal(mockError);
          done();
        });
    });

    it('should return a user and token if the user controller returns a user', () => {
      chai.request(app)
        .post('/register')
        .send(dataValues)
        .end((done) => (_err, res) => {
          expect(res.status).to.be.equal(201);
          expect(res.body).to.be.deep.equal(dataValues);
          done();
        });
    });
  });

  describe('#products', () => {
    beforeEach(() => {
      Sinon.stub(ProductController, 'getAll').callsFake(async () => mockDB);
    });

    afterEach(() => {
      Sinon.restore();
    });

    it('should call the product controller', () => {
      chai.request(app)
        .get('/customer/products')
        .end((done) => (_err, _res) => {
          expect(ProductController.getAll.calledOnce).to.be.true;
          done();
        });
    });

    it('should return the products', () => {
      chai.request(app)
        .get('/customer/products')
        .end((done) => (_err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.deep.equal(mockDB);
          done();
        });
    });
  });
});