const { Router } = require('express');
const user = Router();
const controller = require('../../controller/user');
const schemas = require('./schemas');
const joiMiddleware = require('../../middleware/joi');

user.post('/login', joiMiddleware(schemas.login, 'body'), controller.login);
user.post('/registration', joiMiddleware(schemas.registration, 'body'), controller.registration);

module.exports = user;
