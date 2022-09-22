const { ProductService } = require('../services/');
const { statusCode } = require('../../helpers/StatusResponse');

const getAll = async (_req, res) => {
  const products = await ProductService.getAll();
  res.status(statusCode.ok).json(products);
};

module.exports = {
  getAll,
};