const { statusCode, message } = require('../../helpers/StatusResponse');

const mockReqBody = {
  email: 'john@doe.com',
  password: 'validPassword',
}

const mockUser = {
  name: 'John Doe',
  email: 'john@doe.com',
  role: 'test',
  token: 'token',
};

const mockError = {
  code: statusCode.notFound,
  error: message.userNotFound,
};

// Can use sequelize-test-helpers to make a more professional mock

const mockFindOne = async ({ where, _attributes }) => {
  const { email, password } = where;

  if (!email || !password) {
    return null;
  }
  return { dataValues: { ...mockUser } };
};

module.exports = {
  mockUser,
  mockFindOne,
  mockError,
  mockReqBody,
};
