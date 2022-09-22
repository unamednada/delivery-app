const Sinon = require("sinon");
const { Product } = require("../database/models");
const { mockDB } = require("./mocks/product");
const { ProductService } = require("../database/services");
const { ProductController } = require("../database/controllers");
const { expect } = require("chai");
const { res } = require("./mocks/express");

describe('API Product unit test', () => {
  describe('#service', () => {
    beforeEach(() => {
      Sinon.stub(Product, 'findAll').resolves(mockDB);
    });

    afterEach(() => {
      Sinon.restore();
    });

    it('should call the product model to find all products', async () => {
      await ProductService.getAll();
      expect(Product.findAll.calledOnce).to.be.true;
    });

    it('should return all products', async () => {
      const res = await ProductService.getAll();
      expect(res).to.be.an("array");
      expect(res).to.be.eq(mockDB);
    });
  });

  describe('#controller', () => {
    let req = {};

    beforeEach(() => {
      Sinon.stub(ProductService, "getAll").resolves(mockDB);
    });

    afterEach(() => {
      Sinon.restore();
    });

    it('should call the product service to get all products', async () => {
      await ProductController.getAll(req, res);
      expect(ProductService.getAll.calledOnce).to.be.true;
    });

    it('should return all products', async () => {
      await ProductController.getAll(req, res);
      expect(res.statusCode).to.equal(200);
      expect(res.data).to.be.an("array");
      expect(res.data).to.be.eq(mockDB);
    });
  });
});