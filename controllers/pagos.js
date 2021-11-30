const { request, response } = require("express");
const moment = require("moment");
moment().format();

// Modelos de base de datos
const Pago = require('../models/pago');
const Credito = require('../models/credito');
const Cliente = require('../models/cliente');

const postPago = async(req=request, res=response) => {
  
  const {credito, pago} = req.body;
  const fecha = moment().utc(Date);
  const data = {
    credito,
    pago,
    fecha
  }

  try {

    // verificamos si el pago es menor a lo que debe el cliente
    const dbCredito = await Credito.findById(credito);

    if(pago <= dbCredito.saldo_total){

      // solo si el pago es igual o mayor a lo que el cliente debe se guarda el pago
      const nPago = new Pago(data);
      await nPago.save();

    } else if(pago > dbCredito.saldo_total){

      // si el saldo total el menor al pago entonces mandamos un mensaje de error advirtiendo que el el saldo es menor a al pago, y asi la persona sepa cuanto es lo que tiene que poner
      return res.status(400).json({
        msg: `Al cliente solo le restan ${dbCredito.saldo_total}`
      })

    }

    //  actualizacion del credito      
    // extraemos los abonos y el saldo que tenemos en el credito
    const abonos = dbCredito.abonos + pago;
    const saldo_total = dbCredito.saldo_total - pago;

    const uCredito = await Credito.findByIdAndUpdate(credito, {abonos, saldo_total}, {new: true});

    // si el credito se cancela cambiamos el estado del credito y el estado del cliente significa esto que el credito ha finalizado
    if(uCredito.saldo_total === 0){
      await Credito.findByIdAndDelete(credito);
      await Cliente.findByIdAndUpdate(dbCredito.cliente, {estado: false});
    }
      
    res.json({
      ok: true
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }
};

const getPagos = async(req=request, res = response) => {
  const { id}  = req.query;
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