const { User } = require('../models');
const { Op } = require('sequelize');
const { statusCode, message } = require('../../helpers/StatusResponse');
const Auth = require('../../api/auth/jwt');

const create = async (name, email, password, role = 'customer') => {
  const exists = await User.findOne({
    where: {
      [Op.or]: [{ name }, { email }],
    },
  });

  if (exists) return { code: statusCode.conflict, error: message.userAlreadyExists };

  const { dataValues: newUser } = await User.create({ name, email, password, role });

  const token = Auth.createToken(newUser);
  delete newUser.password;
  newUser.userId = newUser.id;
  delete newUser.id;

  return { ...newUser, token };
};

module.exports = {
  create,
};
