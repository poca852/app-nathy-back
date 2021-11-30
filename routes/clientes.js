const {Router} = require('express');
// const path = require('path');
const { postCliente, getClientes, getCliente } = require('../controllers/clientes');
const router = Router();

router.post('/', postCliente);
router.get('/', getClientes)
router.get('/:id', getCliente)

// // por defecto
// router.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'public/index.html'))
// })

module.exports = router;