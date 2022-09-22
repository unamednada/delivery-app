const { User } = require('../models');
const { statusCode, message } = require('../../helpers/StatusResponse');
const Auth = require('../../api/auth/jwt');

const login = async (email, password) => {
  const user = await User.findOne({
    where: { email, password },
    attributes: { exclude: ['password'] }
  });
  
  if (!user) {
    return { code: statusCode.notFound, error: message.userNotFound };
  };

  const token = Auth.createToken(user.dataValues);

  user.dataValues.userId = user.dataValues.id;
  delete user.dataValues.id;

  return { ...user.dataValues, token };
};

module.exports = {
  login,
};
