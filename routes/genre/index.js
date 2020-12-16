const { Router } = require('express');
const genre = Router();
const controller = require('../../controller/genre');
const schemas = require('./schemas');
const joiMiddleware = require('../../middleware/joi');

genre.get('/', controller.getAll);
genre.post('/', joiMiddleware(schemas.post, 'body'), controller.create);

module.exports = genre;
