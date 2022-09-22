const { expect } = require('chai');
const Sinon = require('sinon');
const { res } = require('./mocks/express');
const { mockError } = require('./mocks/login');
const errorMiddleware = require('../api/middlewares/error');
const { statusCode, message } = require('../helpers/StatusResponse');

describe('API Middleware unit test', () => {
  describe('#error', () => {
  const next = Sinon.spy();
  
    it('should return the received error code and message if valid', () => {

      errorMiddleware(mockError, {}, res, next);
      expect(res.statusCode).to.equal(mockError.code);
      expect(res.data).to.have.property('message');
      expect(res.data.message).to.equal(mockError.error);
    });

    it('should return internal server error if invalid', () => {
      errorMiddleware({}, {}, res, next);
      expect(res.statusCode).to.equal(statusCode.internalServerError);
      expect(res.data).to.have.property('message');
      expect(res.data.message).to.equal(message.internalServerError);
    });
  });
});