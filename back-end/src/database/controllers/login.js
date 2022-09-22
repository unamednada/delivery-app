const md5 = require('../../helpers/md5');
const { statusCode } = require('../../helpers/StatusResponse');
const { LoginService } = require('../services');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const md5Password = md5.hash(password);
  const user = await LoginService.login(email, md5Password);

  return user.error
    ? next(user)
    : res.status(statusCode.ok).json(user);
};

module.exports = {
  login,
};
