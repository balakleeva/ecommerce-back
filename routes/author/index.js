const { Router } = require('express');
const author = Router();
const controller = require('../../controller/author');
const schemas = require('./schemas');
const joiMiddleware = require('../../middleware/joi');

author.get('/', controller.getAll);
author.post('/', joiMiddleware(schemas.post, 'body'), controller.create);

module.exports = author;
