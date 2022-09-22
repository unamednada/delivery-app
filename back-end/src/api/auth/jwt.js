require('dotenv/config');
const { readFileSync } = require('fs');
const jwt = require('jsonwebtoken');
const { statusCode, message } = require('../../helpers/StatusResponse');

const jwtSecret = readFileSync('jwt.evaluation.key', 'utf-8');

const createToken = (userInfo) =>
  jwt.sign(userInfo, jwtSecret, { expiresIn: '7d', algorithm: 'HS256' });

const authToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(statusCode.unauthorized).json({ error: message.tokenNotFound });
    }

    jwt.verify(authorization, jwtSecret);

    return next();
  } catch (_) {
    return res.status(statusCode.unauthorized).json({ error: message.invalidToken });
  }
};

module.exports = {
  createToken,
  authToken,
  jwtSecret,
};
