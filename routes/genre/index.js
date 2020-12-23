const { Router } = require('express');
const genre = Router();
const controller = require('../../controller/genre');
const schemas = require('./schemas');
const joiMiddleware = require('../../middleware/joi');

genre.get('/', controller.getAll);
genre.post('/', joiMiddleware(schemas.post, 'body'), controller.create);
genre.get('/:id', joiMiddleware(schemas.params, 'params'), controller.get);
genre.put('/:id', joiMiddleware(schemas.params, 'params'), joiMiddleware(schemas.post, 'body'), controller.update);
genre.delete('/:id', joiMiddleware(schemas.params, 'params'), controller.remove);

module.exports = genre;
