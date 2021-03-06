const Joi = require('joi');

const schemas = {
  post: Joi.object({
    name: Joi.string().min(5).required(),
    genreType: Joi.string().valid('журнал', 'книга').required(),
  }),
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

module.exports = schemas;
