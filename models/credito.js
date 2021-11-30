const {Schema, model} = require('mongoose');

const CreditoSchema = Schema({

  prestado: {
    type: Number,
    required: true,
  },

  cuotas: {
    type: Number,
    required: true
  },

  valor_cuota: {
    type: Number,
    required: true
  },

  cliente: {
    type: Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },

  interes: {
    type: Number,
    required: true,
  },

  abonos: {
    type: Number,
    required: true,
    default: 0
  },

  fecha_inicio: {
    type: Date,
    required: true,
  },

  fecha_fin: {
    type: Date,
    required: true
  },

  estado: {
    type: Boolean,
    required: true,
    default: true
  },

  total_a_pagar: {
    type: Number,
    required: true
  },

  saldo_total: {
    type: Number,
    required: true
  }

  // historial_pagos:[{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Pago',
  //   required: true,
  //   default: []
  // }],  

});

CreditoSchema.methods.toJSON = function() {
  const {__v, ...data} = this.toObject();

  return data;

}

module.exports = model('Credito', CreditoSchema);