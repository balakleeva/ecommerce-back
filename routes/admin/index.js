const { Router } = require('express');
const admin = Router();
const controller = require('../../controller/admin');
const schemas = require('./schemas');
const joiMiddleware = require('../../middleware/joi');

admin.post('/auth', joiMiddleware(schemas.auth, 'body'), controller.auth);
admin.post('/', joiMiddleware(schemas.create, 'body'), controller.create);
admin.get('/', controller.getAll);

module.exports = admin;
