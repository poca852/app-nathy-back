const {Router} = require('express');
// const path = require('path');
const { postCredito,getCreditos,getCredito } = require('../controllers/creditos');

const router = Router();

// post credito
router.post('/', postCredito);
// get credito
router.get('/', getCreditos);

// get credito
router.get('/:id', getCredito)
// put credito
// router.put('/:id', putUsuarios);
// // delete credito
// router.delete('/:id', deleteUsuarios);

// // por defecto
// router.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'public/index.html'))
// })

module.exports = router;