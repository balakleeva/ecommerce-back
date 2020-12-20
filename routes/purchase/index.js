const { Router } = require('express')
const purchase = Router()
const controller = require('../../controller/purchase')
const adminAuthMiddleware = require('../../middleware/authAdmin')
// const schemas = require('./schemas');
// const joiMiddleware = require('../../middleware/joi');
const clientAuthMiddleware = require('../../middleware/authClient')

purchase.get('/', adminAuthMiddleware, controller.getAll)
purchase.get('/most-expensive', adminAuthMiddleware, controller.mostExpensive)
purchase.get('/:id', adminAuthMiddleware, controller.getOne)
purchase.post('/create-admin', adminAuthMiddleware, controller.createAdmin)
purchase.post('/', clientAuthMiddleware, controller.create)

module.exports = purchase
