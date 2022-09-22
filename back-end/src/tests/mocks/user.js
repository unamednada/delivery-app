const mockRegisterUser = [
  'John Doe',
  'john@doe.com',
  'validPassword',
  'test',
];

const mockRegisterUserObj = {
  dataValues: {
    name: 'John Doe',
    email: 'john@doe.com',
    password: 'validPassword',
    role: 'test',
  }
};

module.exports = {
  mockRegisterUserObj,
  mockRegisterUser,
};
