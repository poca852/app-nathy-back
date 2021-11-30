const {Router} = require('express');
const { postGasto, getGasto } = require('../controllers/gastos');
const router = Router();

router.post('/', postGasto);
router.get('/', getGasto);

module.exports = router;