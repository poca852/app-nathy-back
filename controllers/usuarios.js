const { request, response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const postUsuarios = async(req=request, res=response) => {
  
  const { usuario, nombre, password } = req.body;

  try {
    
    // verificamos si ya existe el usuario
    const existeUsuario = await Usuario.findOne({usuario});
    if(existeUsuario){
      return res.status(400).json({
        msg: `El usuario ${usuario} ya existe`
      })
    }

    // si el usuarios no existe instanciamos el usuario con los datos que llegan
    const newUsuario = new Usuario(body);

    // encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    newUsuario.password = bcryptjs.hashSync(password, salt);

    // guardamos el usuario
    await newUsuario.save();

    res.status(201).json({
      ok: true
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

    res.status(200).json({
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
  
  const { id } = req.params;
  const { _id, password, ...resto } = req.body;

  try {
    

    if( password ){

      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt);

    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true});

    res.status(200).json({
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