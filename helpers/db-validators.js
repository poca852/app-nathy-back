// const Usuario = require('../models/usuario');
// const Cliente = require('../models/cliente');
// const Credito = require('../models/credito');
// const Pago = require('../models/pago');
// const Gasto = require('../models/gasto');


// const existeUsuario = async( usuario = '' ) => {

//   const verificacionUsuario = await Usuario.findOne({usuario});

//   if( verificacionUsuario ){
//     throw new Error(`El usuario ${usuario} ya esta registrado`);
//   }

// }

// const existeUsuarioPorId = async( id ) => {

//   // VERIFICAS si existe el id
//   const existeUsuario = await Usuario.findById(id);

//   if( !existeUsuario ){
//     throw new Error(`El id ${id} no existe`);
//   }

// }

// const existeClientePorId = async(id) => {

//   const existeCliente = await Cliente.findById(id);
//   if(!existeCliente){
//     throw new Error(`El cliente ${id} no existe en la base de datos`)
//   }

// }

// const existeDpi = async( dpi = '' ) => {
//   const existe_dpi = await Cliente.findOne({ dpi });
//   if(existe_dpi){
//     throw new Error(`El Dpi ${ dpi } ya esta registrado`)
//   }
// }

// const verificaAlias = async(alias = '') => {

//   const existeAlias = await Cliente.findOne({alias});
//   if(existeAlias){
//     throw new Error(`El alias ${alias} ya existe en la base de datos`)
//   }

// } 

// const esCreditoValido = async(id) => {
//   const existeCredito = await Credito.findById(id);
//   if(!existeCredito){
//     throw new Error(`El credito ${id} no existe en la base de datos`);
//   }
// }

// const esPagoValido = async(id) => {
//   const existePago = await Pago.findById(id);
//   if(!existePago) {
//     throw new Error(`El pago ${id} no existe en la db`)
//   }
// }

// const esListaGastoValido = async(gasto = '') => {
//   const existeListaGasto = await ListaGasto.findOne({gasto});
//   if(!existeListaGasto) {
//     throw new Error(`El gasto ${gasto} no existe en la db`)
//   }
// }

// const esGastoValido = async(id) => {
//   const existeGasto = await Gasto.findById(id);
//   if(!existeGasto) {
//     throw new Error(`No existe el GAsto ${id}`)
//   }
// }

// const esInversionValida = async(id) => {

//   const existeInversion = await Inversion.findById(id);
//   if(!existeInversion){
//     throw new Error(`no existe la inversion ${id}`);
//   };

// }

// const esRetiroValido = async(id) => {

//   const existeRetiro = await Retiro.findById(id);

//   if(!existeRetiro){
//     throw new Error(`El retiro ${id} no existe`);
//   }

// }

// module.exports = {
//   esRolValido,
//   existeUsuario,
//   existeUsuarioPorId,
//   existeClientePorId,
//   existeDpi,
//   verificaAlias,
//   esCreditoValido,
//   esPagoValido,
//   esListaGastoValido,
//   esGastoValido,
//   esInversionValida,
//   esRetiroValido
// }