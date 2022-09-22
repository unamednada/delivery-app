const md5 = require('../../helpers/md5');
const { statusCode } = require('../../helpers/StatusResponse');
const { UserService } = require('../services');

const create = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const md5Password = md5.hash(password);
  const user = await UserService.create(name, email, md5Password, role);

  return user.error
    ? next(user)
    : res.status(statusCode.created).json(user);
};

module.exports = {
  create,
};
