require('dotenv/config');
const jwt = require('jsonwebtoken');
const { readFileSync } = require('fs');
const { statusCode } = require('../../helpers/StatusResponse');
const { SaleService } = require('../services');

const create = async (req, res, next) => {
  const {
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    cart,
  } = req.body;

  const sale = await SaleService.create({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    cart,
  });

  return sale.error ? next(sale) : res.status(statusCode.created).json(sale);
};

const getByUser = async (req, res, next) => {
  const { authorization } = req.headers;

  const jwtSecret = readFileSync('jwt.evaluation.key', 'utf-8');
  const { email } = jwt.verify(authorization, jwtSecret);

  const sale = await SaleService.getByUserEmail(email);

  return sale.error
    ? next(sale)
    : res.status(statusCode.ok).json(sale);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const sale = await SaleService.getById(id);

  return sale.error
    ? next(sale)
    : res.status(statusCode.ok).json(sale);
};

const updateStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const sale = await SaleService.updateStatus(id, status);

  return sale.error
    ? next(sale)
    : res.status(statusCode.ok).json(sale);
};

module.exports = {
  create,
  getByUser,
  getById,
  updateStatus,
};
