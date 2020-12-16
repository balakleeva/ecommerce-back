const Joi = require('joi');

const schemas = {
  post: Joi.object({
    name: Joi.string().min(5).required(),
    bio: Joi.string().required(),
  })
};

module.exports = schemas;
