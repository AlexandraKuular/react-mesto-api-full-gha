const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');
const SECRET = require('../constants/secret');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация.');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, SECRET);
  } catch (err) {
    // отправим ошибку, если не получилось
    throw new UnauthorizedError('Необходима авторизация.');
  }
  req.user = payload;
  next();
};
