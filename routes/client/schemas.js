const Joi = require('joi');

const schemas = {
    post: Joi.object({
        name: Joi.string().min(5).required(),
        phone: Joi.string().min(5).required(),
        login: Joi.string().min(5).required(),
        password: Joi.string().min(5).required(),
    }),
    auth: Joi.object({
        login: Joi.string().min(5).required(),
        password: Joi.string().min(5).required(),
    }),
    params: Joi.object({
        id: Joi.string().required(),
    }),
};

module.exports = schemas;
