const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");


const login = async( req, res ) => {

  const { usuario, password } = req.body;

  try {

    // verificamos si existe el usuario
    const data = await Usuario.findOne( { usuario } );

    if( !data ){

      return res.status( 400 ).json( {
        ok: false,
        msg: `Usuario ${ usuario } no existe`
      } );

    };

    // verificar contraseña
    const validPassword = bcryptjs.compareSync( password, data.password );
    if( !validPassword ){

      return res.status( 400 ).json( {

        ok: false,
        msg: 'Contraseña Incorrecta'

      } );

    };

    // genramos el jwt
    const token = await generarJWT(data._id)

    res.status( 200 ).json( {

      ok: true,
      id: data._id,
      nombre: data.nombre,
      token,

    } );

  } catch (error) {

    console.log( error );
    res.status( 500 ).json( {

      msg: 'hable con el administrador'

    } );

  };

};

const revalidarToken = async( req, res ) => {

  const { id, nombre} = req.usuario;
  
  const token = await generarJWT( id );

  res.status( 200 ).json( {
    ok: true,
    token,
    id,
    nombre
  } )

}

module.exports = {
  login,
  revalidarToken
};