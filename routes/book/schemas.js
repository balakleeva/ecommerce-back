const Joi = require('joi');

const schemas = {
  post: Joi.object({
    name: Joi.string().min(2).required(),
    genreId: Joi.number().required(),
    authorId: Joi.number().required(),
    publisher: Joi.string().min(2).required(),
    publishYear: Joi.string().min(2).required(),
    image: Joi.string().min(2),
    buyPrice: Joi.number(),
    rentPrice: Joi.number(),
    quantity: Joi.number(),
  }),
  params: Joi.object({
    id: Joi.string().required(),
  })
};

module.exports = schemas;
