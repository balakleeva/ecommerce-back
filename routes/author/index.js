const { Router } = require('express');
const author = Router();
const controller = require('../../controller/author');
const schemas = require('./schemas');
const joiMiddleware = require('../../middleware/joi');

author.get('/', controller.getAll);
author.post('/', joiMiddleware(schemas.post, 'body'), controller.create);
author.delete('/:id', joiMiddleware(schemas.params, 'params'), controller.deleteAuthor)
author.get('/:id',  joiMiddleware(schemas.params, 'params'), controller.get)
author.put('/:id',  joiMiddleware(schemas.params, 'params'), joiMiddleware(schemas.post, 'body'), controller.update)
author.delete('/:id',  joiMiddleware(schemas.params, 'params'), controller.remove);

module.exports = author;
