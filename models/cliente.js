const { Schema, model } = require('mongoose');

const ClienteSchema = Schema({

  dpi: {
    type: String,
    required: true,
    unique: true
  },

  nombre: {
    type: String,
    required: true
  },

  alias: {
    type: String,
    required: true,
    unique: true
  },

  estado: { // este estado verifica que si el cliente tiene credito actualmente pendiente de pago
    type: Boolean,
    required: true,
    default: false
  },

  // es la lista de creditos que tiene el cliente actualmente ya sean pagos o pendientes de pago.
  // creditos: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Credito',
  //   required: true,
  //   default: []
  // }],

  ciudad: {
    type: String,
    required: true
  },

  celular: {
    type: String,
    required: true
  },

  direccion: {
    type: String,
    required: true
  },

});

ClienteSchema.methods.toJSON = function() {
  const { __v, ...data} = this.toObject();
  return data;
}

module.exports = model('Cliente', ClienteSchema);