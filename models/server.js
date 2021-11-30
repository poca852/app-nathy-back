const express = require('express');
const cors = require('cors');
const {dbConection} = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port= process.env.PORT;

    // rutas de mi api
    this.paths = {
      auth: '/api/auth',
      usuarios: '/api/usuarios',
      creditos: '/api/creditos',
      clientes: '/api/clientes',
      pagos: '/api/pagos',
      gastos: '/api/gastos',
    }

    // conectar a base de datos
    this.conectarDB();

    // middlewares
    this.middlewares();

    // rutas de mi aplicacion
    this.routes();
  }

  async conectarDB(){
    await dbConection()
  }

  middlewares(){
    // cors
    this.app.use(cors());

    // lectura y parseo del body
    this.app.use(express.json());

    // directorio publico
    this.app.use(express.static('public'));
  }

  routes(){
    this.app.use( this.paths.auth, require('../routes/auth'));
    this.app.use( this.paths.usuarios, require('../routes/usuarios'));
    this.app.use( this.paths.creditos, require('../routes/creditos'));
    this.app.use( this.paths.clientes, require('../routes/clientes') );
    this.app.use( this.paths.pagos, require('../routes/pagos') );
    this.app.use( this.paths.gastos, require('../routes/gastos') );
  }

  listen(){
    this.app.listen(this.port, () => {
      console.log('server online')
    })
  }
}

module.exports = Server;