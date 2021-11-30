const { request, response } = require("express");
const Cliente = require("../models/cliente");

const postCliente = async(req=request, res=response) => {

  // extraemos lo que viene en el body
  const { body } = req;

  try{

    // verificamos que el cliente no exista en la base de datos
    const existeCliente = await Cliente.findOne( {dpi: body.dpi} );
    if(existeCliente){
      return res.status(400).json({
        msg: `El cliente ${existeCliente.nombre} ya existe en la base de datos`
      })
    }

    // si el cliente no existe lo guardamos en la base de datos
    const cliente = new Cliente(body);
    await cliente.save();

    res.status(201).json({
      ok: true
    })

  }catch(error){
    console.log(error);
    res.status(500).json({
      msg: 'hable con el administrador'
    })
  }
}

const getClientes = async(req=request, res=response) => {

  // condicionamos el query, segun lo que me mande el front
  const { estado= 'true' } = req.query;
  let query
  if(estado === 'true'){
    query = true;
  }else{
    query = false;
  }

  const clientes = await Cliente.find({estado: query});

  res.status(200).json(clientes)
}

const getCliente = async(req=request, res=response) => {

  const { id } =req.params;
  const cliente = await Cliente.findById(id);

  res.status(200).json(cliente)
}

module.exports = {
  postCliente,
  getClientes,
  getCliente
}