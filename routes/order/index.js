const { Router } = require('express')
const order = Router()
const controller = require('../../controller/order')
const adminAuthMiddleware = require('../../middleware/authAdmin')
const clientAuthMiddleware = require('../../middleware/authClient')

order.get('/', adminAuthMiddleware, controller.getAll)
order.get('/search', adminAuthMiddleware, controller.search)
order.get('/:orderId', adminAuthMiddleware, controller.getOne)
order.post('/', clientAuthMiddleware, controller.create)
order.post('/make-done/:orderId', adminAuthMiddleware, controller.makeDone)

module.exports = order
