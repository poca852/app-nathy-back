const {Router} = require('express');
// const path = require('path');
const { postPago, getPagos } = require('../controllers/pagos');

const router = Router();

// postPagos
router.post('/', postPago);

// getPagos
router.get('/', getPagos);

// por defecto
// router.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'public/index.html'))
// })

module.exports = router;