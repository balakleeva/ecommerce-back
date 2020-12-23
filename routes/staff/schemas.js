const Joi = require('joi');

const schemas = {
    auth: Joi.object({
        login: Joi.string().min(5).required(),
        password: Joi.string().required(),
    }),

    create: Joi.object({
        name: Joi.string().min(5).required(),
        role: Joi.string().required(),
    })
};

module.exports = schemas;
