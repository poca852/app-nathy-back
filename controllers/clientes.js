const { request, response } = require("express");
const Cliente = require("../models/cliente");

const postCliente = async(req=request, res=response) => {
  try{

    const {body} = req;
    const cliente = new Cliente(body);
    await cliente.save();

    res.json({
      ok: true,
      cliente
    })

  }catch(error){
    console.log(error);
    res.status(500).json({
      msg: 'hable con el administrador'
    })
  }
}

const getClientes = async(req=request, res=response) => {
  const { estado= 'true' } = req.query;
  
  let query
  if(estado === 'true'){
    query = true;
  }else{
    query = false;
  }

  const clientes = await Cliente.find({estado: query});
  res.json(clientes)
}

const getCliente = async(req=request, res=response) => {
  const {id} =req.params;
  const cliente = await Cliente.findById(id);

  res.json(cliente)
}

module.exports = {
  postCliente,
  getClientes,
  getCliente
}