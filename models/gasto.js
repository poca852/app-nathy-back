const {Schema, model} = require('mongoose');

const GastoSchema = Schema({
  fecha: {
    type: Date,
    required: true
  },

  valor: {
    type: Number,
    required: true
  },

  descripcion: {
    type: String,
    required: true,
  }
})

GastoSchema.methods.toJSON = function() {
  const {__v, ...data} = this.toObject();
  return data;
};

module.exports = model('Gasto', GastoSchema);