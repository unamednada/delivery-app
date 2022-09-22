const { expect } = require('chai');
const Sinon = require('sinon');
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');
const UserMock = require('../database/models/user');
const ProductMock = require('../database/models/product');
const SalesProductMock = require('../database/models/salesproduct');
const SaleMock = require('../database/models/sale');


describe('API Database unit test', () => {
  const SalesProduct = SalesProductMock(sequelize, dataTypes);
  const Sale = SaleMock(sequelize, dataTypes);
  const User = UserMock(sequelize, dataTypes);
  const Product = ProductMock(sequelize, dataTypes);

  describe('#user', () => {
    const user = new User();

    it('should have name User', () => {
      checkModelName(User)('User');
    });

    it('should have the correct properties', () => {
      checkPropertyExists(user)('name');
      checkPropertyExists(user)('email');
      checkPropertyExists(user)('password');
      checkPropertyExists(user)('role');
    });    
  });

  describe('#product', () => {
    const product = new Product();

    it('should have name Product', () => {
      checkModelName(Product)('Product');
    });

    it('should have the correct properties', () => {
      checkPropertyExists(product)('name');
      checkPropertyExists(product)('price');
      checkPropertyExists(product)('url_image');
    });

    it('should have the correct association to SalesProduct', () => {
      Product.associate({ SalesProduct });

      expect(Product.hasMany.calledOnce).to.be.true;
      expect(Product.hasMany.calledWith(SalesProduct)).to.be.true;
    });
  });

  describe('#sale', () => {
    const sale = new Sale();

    it('should have name Sale', () => {
      checkModelName(Sale)('Sale');
    });

    it('should have the correct properties', () => {
      checkPropertyExists(sale)('user_id');
      checkPropertyExists(sale)('seller_id');
      checkPropertyExists(sale)('total_price');
      checkPropertyExists(sale)('delivery_address');
      checkPropertyExists(sale)('delivery_number');
      checkPropertyExists(sale)('sale_date');
      checkPropertyExists(sale)('status');
    });

    it('should have the correct association to SalesProduct', () => {
      Sale.associate({ SalesProduct });

      expect(Sale.belongsTo.calledOnce).to.be.true;
      expect(Sale.belongsTo.calledWith(SalesProduct)).to.be.true;
    });

    it('should have the correct association to User', () => {
      Sale.associate({ User });

      expect(Sale.hasMany.calledTwice).to.be.true;
      expect(Sale.hasMany.calledWith(User)).to.be.true;
    });
  });

  describe('#salesproduct', () => {
    const salesproduct = new SalesProduct();

    it('should have name SalesProduct', () => {
      checkModelName(SalesProduct)('SalesProduct');
    });

    it('should have the correct properties', () => {
      checkPropertyExists(salesproduct)('sale_id');
      checkPropertyExists(salesproduct)('product_id');
      checkPropertyExists(salesproduct)('quantity');
    });

    it('should have the correct association to Sale', () => {
      SalesProduct.associate({ Sale });

      expect(SalesProduct.belongsTo.calledTwice).to.be.true;
      expect(SalesProduct.belongsTo.calledWith(Sale)).to.be.true;
    });

    it('should have the correct association to Product', () => {
      SalesProduct.associate({ Product });

      expect(SalesProduct.belongsTo.calledWith(Product)).to.be.true;
    });
  });
});