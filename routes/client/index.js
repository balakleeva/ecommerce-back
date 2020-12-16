const { Router } = require('express');
const router = Router();
const controller = require('../../controller/client');

router.get('/', controller.getAll);
router.get('/create', controller.create);

module.exports = router;
