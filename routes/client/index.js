const { Router } = require('express');
const router = Router();
const controller = require('../../controller/client');
const validate = require('../../middleware/joi');
const schemas = require('./schemas');

router.get('/', controller.getAll);
router.post('/create-admin', controller.createAdmin);
router.post('/', validate(schemas.post, 'post'), controller.create);
router.post('/auth', validate(schemas.auth, 'post'), controller.auth);
router.delete('/:id', validate(schemas.params, 'params'), controller.remove);

module.exports = router;
