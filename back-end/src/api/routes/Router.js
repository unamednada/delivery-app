const { Router } = require('express');
const {
  LoginController,
  UserController,
  ProductController,
  SaleController,
} = require('../../database/controllers');
const authToken = require('../middlewares/auth');

const router = Router();

router.route('/login')
  .post(LoginController.login);

router.route('/register')
  .post(UserController.create);

router.route('/customer/products')
  .get(ProductController.getAll);

router.route('/customer/orders')
  .post(authToken, SaleController.create)
  .get(authToken, SaleController.getByUser);

router.route('/customer/orders/:id')
  .get(authToken, SaleController.getById)
  .put(authToken, SaleController.updateStatus);

  router.route('/seller/orders')
  .get(authToken, SaleController.getByUser);

router.route('/seller/orders/:id')
.get(authToken, SaleController.getById)
.put(authToken, SaleController.updateStatus);

router.route('/admin/manage');

module.exports = router;
