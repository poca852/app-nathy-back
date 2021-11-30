const { request, response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const postUsuarios = async(req=request, res=response) => {
  try {
    
    const {body} = req;
    const newUsuario = new Usuario(body);

    // encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    newUsuario.password = bcryptjs.hashSync(body.password, salt);

    // guardamos el usuario
    await newUsuario.save();

    res.json({
      newUsuario
    })

  } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Hable con el administrador'
      })
  }
};

const getUsuarios = async(req, res) => {

  try {

    const usuarios = await Usuario.find()

    res.json({
      usuarios
    })


  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'hable con el admistrador'
    })
  }
  
};

const putUsuarios = async(req, res) => {
  try {
    
    const {id} = req.params;
    const {_id, password, ...resto} = req.body;

    if(password){
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true});

    res.json({
      usuario
    })


  } catch (error) {
    console.log(error);
    res.statsu(500).json({
      msg: 'Hable con el administrador'
    })
  }
};

const deleteUsuarios = (req, res) => {
  res.json({
    msg: 'delete Usuarios'
  })
};

module.exports = {
  postUsuarios,
  getUsuarios,
  putUsuarios,
  deleteUsuarios
}