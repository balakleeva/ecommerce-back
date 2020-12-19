const { Router } = require('express')
const rent = Router()
const controller = require('../../controller/rent')
const adminAuthMiddleware = require('../../middleware/authAdmin')
// const schemas = require('./schemas');
// const joiMiddleware = require('../../middleware/joi');
const clientAuthMiddleware = require('../../middleware/authClient')

rent.get('/', adminAuthMiddleware, controller.getAll)
rent.get('/:id', adminAuthMiddleware, controller.getOne)
// rent.post('/create-admin', adminAuthMiddleware, controller.createAdmin);
rent.post('/', clientAuthMiddleware, controller.create)
rent.put('/:id', adminAuthMiddleware, controller.updateReturn)

module.exports = rent
