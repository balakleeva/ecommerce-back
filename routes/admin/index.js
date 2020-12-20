const { Router } = require('express');
const admin = Router();
const controller = require('../../controller/admin');
const schemas = require('./schemas');
const joiMiddleware = require('../../middleware/joi');

admin.get('/', controller.getAll);
admin.get('/search', controller.search);
admin.post('/auth', joiMiddleware(schemas.auth, 'body'), controller.auth);
admin.post('/', joiMiddleware(schemas.create, 'body'), controller.create);

module.exports = admin;
