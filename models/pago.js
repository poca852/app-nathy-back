const {Schema, model} = require('mongoose');

const PagoSchema = Schema({
  fecha: {
    type: Date,
    required: true
  },

  credito: {
    type: Schema.Types.ObjectId,
    ref: "Credito",
    required: true
  },

  pago: {
    type: Number,
    required: true
  }
})

PagoSchema.methods.toJSON = function(){
  const {__v, ...data} = this.toObject();
  
  return data;
}

module.exports = model('Pago', PagoSchema);