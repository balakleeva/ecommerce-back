const { Router } = require('express');
const purchase = Router();
const controller = require('../../controller/purchase');
const schemas = require('./schemas');
const joiMiddleware = require('../../middleware/joi');

purchase.get('/', controller.getAll);
purchase.post('/', joiMiddleware(schemas.post, 'body'), controller.create);

module.exports = purchase;
