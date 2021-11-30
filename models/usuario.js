const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({

  usuario: {
    type: String,
    required: true,
    unique: true
  },

  nombre: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true
  }
});

UsuarioSchema.methods.toJSON = function() {
  const {__v, password, ...usuario} = this.toObject();
  return usuario;
}

module.exports = model('Usuario', UsuarioSchema);