const { Router } = require('express')
const rent = Router()
const controller = require('../../controller/rent')
const adminAuthMiddleware = require('../../middleware/authAdmin')
// const schemas = require('./schemas');
// const joiMiddleware = require('../../middleware/joi');
const clientAuthMiddleware = require('../../middleware/authClient')

rent.get('/most-popular', adminAuthMiddleware, controller.mostPopular);
rent.get('/', adminAuthMiddleware, controller.getAll)
rent.get('/search', adminAuthMiddleware, controller.search)
rent.get('/current-rent', adminAuthMiddleware, controller.currentRent)
rent.get('/:id', adminAuthMiddleware, controller.getOne)
rent.post('/create-admin', adminAuthMiddleware, controller.createAdmin)
rent.post('/', clientAuthMiddleware, controller.create)
rent.put('/:id', adminAuthMiddleware, controller.updateReturn)
rent.put('/mark-outdated/:id', adminAuthMiddleware, controller.markOutdated);

module.exports = rent
