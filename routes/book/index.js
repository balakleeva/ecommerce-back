const { Router } = require('express');
const router = Router();
const controller = require('../../controller/book');
const validate = require('../../middleware/joi');
const schemas = require('./schemas');

router.get('/', controller.getAll);
router.get('/byIds', controller.getByIds)
router.get('/:id', validate(schemas.params, 'params'), controller.getOne);
router.post('/', validate(schemas.post, 'body'), controller.create);
router.put('/:id', validate(schemas.post, 'body'), validate(schemas.params, 'params'), controller.update);
router.delete('/:id', validate(schemas.params, 'params'), controller.remove);

module.exports = router;
