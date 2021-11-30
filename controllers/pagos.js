const { request, response } = require("express");
const moment = require("moment");
moment().format();

// Modelos de base de datos
const Pago = require('../models/pago');
const Credito = require('../models/credito');
const Cliente = require('../models/cliente');

const postPago = async(req=request, res=response) => {
 try {

   const {credito, pago} = req.body;
   const fecha = moment().utc(Date);
   const data = {
     credito,
     pago,
     fecha
   }

    const nPago = new Pago(data);
    await nPago.save();

    //  actualizacion del credito
    // 
    const dbCredito = await Credito.findById(credito);
    
    // extraemos los abonos y el saldo que tenemos en el credito
    const abonos = dbCredito.abonos + pago;
    const saldo_total = dbCredito.saldo_total - pago;

    const uCredito = await Credito.findByIdAndUpdate(credito, {abonos, saldo_total}, {new: true});

    // si el credito se cancela cambiamos el estado del credito y el estado del cliente significa esto que el credito ha finalizado
    if(uCredito.saldo_total === 0){
      await Credito.findByIdAndUpdate(credito, {estado: false});
      await Cliente.findByIdAndUpdate(dbCredito.cliente, {estado: false});
    }
    
  res.json({
    ok: true,
    nPago
  })

 } catch (error) {
   console.log(error);
   res.status(500).json({
     msg: 'Hable con el administrador'
   })
 }
};

const getPagos = async(req=request, res = response) => {
  const {id} = req.query;
  try{

    const pagos = await Pago.find({credito: id});

    res.json({
      pagos,
    })

  }catch(error){
    console.log(error);
    res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }

};

module.exports = {
  postPago,
  getPagos
}