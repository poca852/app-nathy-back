const { request, response } = require("express");
const moment = require('moment');
const Credito = require("../models/credito");
const Cliente = require('../models/cliente');
moment().format();

const postCredito = async(req=request, res=response) => {
  try {

    // extraemos la informacion que viene en el body;
    const {prestado, cliente, cuotas} = req.body;

    // añadimos informacion que el frontEnd no envia
    const interes = prestado * 0.20;
    const fecha_inicio = moment().utc(Date);
    const fecha_fin = moment().utc(Date).add(23, 'd');
    const total_a_pagar = prestado + interes;
    const valor_cuota = total_a_pagar / cuotas;
    const saldo_total = prestado + interes;

    // agrupamos toda la data en un objeto 
    const data = {
      prestado, 
      cliente,
      cuotas,
      interes,
      total_a_pagar,
      valor_cuota,
      saldo_total,
      fecha_inicio,
      fecha_fin,
    }

    const credito = new Credito(data);
    await credito.save();

    // actualizamos el estado del cliente a true, ya que ya se le asigna un nuevo credito
    await Cliente.findByIdAndUpdate(cliente, {estado: true});

    res.status(201).json({
      ok: true
    })

  } catch (error) {
    console.log(error);
    res.json('hable con el administrador')
  }
}

const getCreditos = async(req=request, res=response) => {

  // verificamos el query, si viene false, enviamos los clientes que no tienen creditos vigentes, si es true enviamos los clientes que tienen credtios actualmente
  const {estado = 'true'} = req.query;
  let query;
  if(estado === 'true'){
    query = true
  }else if(estado === 'false'){
    query = false
  }

  const creditos = await Credito.find({estado: query}).populate('cliente');

  res.status(200).json(creditos);

}

const getCredito = async(req=request, res=response) => {

  const { id } = req.params;
  const credito = await Credito.findById(id).populate('cliente');

  res.status(200).json(credito);
}

module.exports = {
  postCredito,
  getCreditos,
  getCredito
}