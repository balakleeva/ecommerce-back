const { Router } = require('express')
const admin = require('./admin')
const author = require('./author')
const client = require('./client')
const genre = require('./genre')
const book = require('./book')
const purchase = require('./purchase')
const rent = require('./rent')
const api = Router()

api.use('/admin', admin)
api.use('/author', author)
api.use('/client', client)
api.use('/genre', genre)
api.use('/book', book)
api.use('/purchase', purchase)
api.use('/rent', rent)

module.exports = api
