const Joi = require('joi');

const schemas = {
    post: Joi.object({
        name: Joi.string().min(5).required(),
        phone: Joi.string().min(5).required(),
    })
};

module.exports = schemas;
