const { Router } = require('express');
const admin = require('./admin');
const author = require('./author');
const client = require('./client');
const genre = require('./genre');
const book = require('./book');
const api = Router();

api.use('/admin', admin);
api.use('/author', author);
api.use('/client', client);
api.use('/genre', genre);
api.use('/book', book);

module.exports = api;
