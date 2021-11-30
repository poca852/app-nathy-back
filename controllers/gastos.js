const {request, response} = require('express');
const Gasto = require('../models/gasto');
const moment = require('moment');
moment().format();

const postGasto = async(req = request, res = response) => {

    const {valor, descripcion} = req.body;
    const fecha = moment().utc(Date);
    const data = {
        valor, descripcion, fecha
    }

    try{

        const gasto = new Gasto(data);
        await gasto.save();

        res.json({
            gasto
        })

    }catch(error){
        res.json({
            msg:'hable con el administrador'
        })
    }

};

const getGasto = async(req=request, res=response) => {
    const gastos = await Gasto.find();

    res.json({
        gastos
    })

};

module.exports = {
    postGasto,
    getGasto
}