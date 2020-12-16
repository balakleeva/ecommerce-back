const { Router } = require('express');
const router = Router();
const controller = require('../../controller/book');

router.get('/', controller.getAll);
router.get('/create', controller.create);

module.exports = router;
