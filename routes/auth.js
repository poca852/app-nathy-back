const { Router } = require('express');
// const path = require('path');
const { validarJWT, validarCampos } = require('../middlewares');
const { login, revalidarToken } = require('../controllers/auth');

const router = Router();

router.post( '/login', login );

router.get( '/renew', [validarJWT, validarCampos], revalidarToken )


// // por defecto
// router.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'public/index.html'))
// })

module.exports = router;