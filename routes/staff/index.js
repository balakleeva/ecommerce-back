const { Router } = require('express');
const admin = Router();
const controller = require('../../controller/staff');
const schemas = require('./schemas');
const joiMiddleware = require('../../middleware/joi');

admin.get('/', controller.getAll);
admin.get('/search', controller.search);
admin.post('/auth', joiMiddleware(schemas.auth, 'body'), controller.auth);
admin.post('/', controller.create);
admin.get('/:id', joiMiddleware(schemas.update, 'params'), controller.get);
admin.put('/:id', joiMiddleware(schemas.update, 'params'), joiMiddleware(schemas.create, 'body'), controller.update);

module.exports = admin;
