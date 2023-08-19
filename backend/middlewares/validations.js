const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');
const ErrorCode = require('../errors/errorCode');

const validationUrl = (url) => {
  const validate = isUrl(url);
  if (validate) {
    return url;
  }
  throw new ErrorCode('Проверьте URL адрес.');
};

module.exports.validationCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

module.exports.validationCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validationUrl),
  }),
});

module.exports.validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validationRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validationUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validationUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

module.exports.validationUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.validationAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(validationUrl),
  }),
});
