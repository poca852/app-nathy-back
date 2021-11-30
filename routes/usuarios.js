const { Router } = require('express');
// const path = require('path')
const router = Router();

// controladores de mis rutas
const { postUsuarios, 
        getUsuarios, 
        putUsuarios, 
        deleteUsuarios } = require('../controllers/usuarios');

// post usuarios
router.post('/', postUsuarios);
// get usuarios
router.get('/', getUsuarios);
// put usuarios
router.put('/:id', putUsuarios);
// delete usuarios
router.delete('/:id', deleteUsuarios);

// por defecto
// router.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'public/index.html'))
// })


module.exports = router;