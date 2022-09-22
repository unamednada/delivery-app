const { Sale, SalesProduct, Product, User } = require('../models');
const { statusCode, message } = require('../../helpers/StatusResponse');
const { Op } = require('sequelize');

const create = async ({ userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, cart }) => {
  const sale = await Sale.create({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
  });

  await Promise.all(cart.map(async ({ id, quantity }) => {
    await SalesProduct.create({
      saleId: sale.id,
      productId: id,
      quantity,
    });
  }));

  return sale.error ? { code: statusCode.badRequest, error: message.badRequest } : sale;
};

const getByUserEmail = async (email) => {
  const { id } = await User.findOne({ where: { email } });
  const sales = await Sale.findAll({ where: { [Op.or]: [
    { userId: id },
    { sellerId: id },
  ] } });

  return sales.error
    ? { code: statusCode.badRequest, error: message.badRequest }
    : sales;
};

const getById = async (id) => {
  const sale = await Sale.findByPk(id, {
    include: [{
      model: Product,
      as: 'products',
      through: {
        attributes: ['quantity'],
      },
    }],
  });

  if (!sale) {
    return { code: statusCode.notFound, error: message.notFound };
  }

  sale.dataValues.products.map(({ dataValues }) => {
    dataValues.quantity = dataValues.SalesProduct.dataValues.quantity;
    delete dataValues.SalesProduct;
    return dataValues;
  });
  
  return sale;
};

const updateStatus = async (id, status) => {
  const sale = await Sale.update({ status }, { where: { id } });

  if (!sale) {
    return { code: statusCode.notFound, error: message.notFound };
  }

  return sale;
};

module.exports = {
  create,
  getByUserEmail,
  getById,
  updateStatus,
};
