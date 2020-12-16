const { Router } = require('express');
const author = require('./author');
const genre = require('./genre');
const book = require('./book');
const api = Router();

api.use('/author', author);
api.use('/genre', genre);
api.use('/book', book);

module.exports = api;
