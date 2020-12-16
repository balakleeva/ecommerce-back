const Joi = require('joi');

const schemas = {
    login: Joi.object({
        email: Joi.string().min(5).required(),
        password: Joi.string().required(),
    }),

    registration: Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().min(5).required(),
        password: Joi.string().required(),
    })
};

module.exports = schemas;
