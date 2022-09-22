const statusCode = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  conflict: 409,
  internalServerError: 500,
};

const message = {
  badRequest: 'Bad request',
  requiredId: 'Id is required',
  notFound: 'Object not found',
  userNotFound: 'User not found',
  tokenNotFound: 'Token not found',
  invalidToken: 'Invalid token',
  userAlreadyExists: 'User already exists',
  internalServerError: 'Internal server error',
};

module.exports = {
  statusCode,
  message,
};
