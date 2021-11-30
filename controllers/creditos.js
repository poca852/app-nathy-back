const { request, response } = require("express");
const moment = require('moment');
const Credito = require("../models/credito");
const Cliente = require('../models/cliente');
moment().format();

const postCredito = async(req=request, res=response) => {
  try {

    // extraemos la informacion que viene en el body;
    const {prestado, cliente, cuotas} = req.body;

    // añadimos informacion que el cliente no envia
    const interes = prestado * 0.20;
    const fecha_inicio = moment().utc(Date);
    const fecha_fin = moment().utc(Date).add(23, 'd');
    const total_a_pagar = prestado + interes;
    const valor_cuota = total_a_pagar / cuotas;
    const saldo_total = prestado + interes;

    // agrupamos toda la data en un abjeto 
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
    await Cliente.findByIdAndUpdate(cliente, {estado: true});

    res.json({
      ok: true,
      credito
    })

  } catch (error) {
    console.log(error);
    res.json('hable con el administrador')
  }
}

const getCreditos = async(req=request, res=response) => {

  const {estado = 'true'} = req.query;
  let query;
  if(estado === 'true'){
    query = true
  }else if(estado === 'false'){
    query = false
  }

  const creditos = await Credito.find({estado: query}).populate('cliente');

  res.json(creditos);
}

const getCredito = async(req=request, res=response) => {
  const {id} = req.params;
  const credito = await Credito.findById(id).populate('cliente');

  res.json(credito);
}

module.exports = {
  postCredito,
  getCreditos,
  getCredito
}