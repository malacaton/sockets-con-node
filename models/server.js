const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');
 
class Server {

   constructor() {
      this.app    = express(); // aplicación con express
      this.port   = process.env.PORT;
      this.server = require('http').createServer( this.app ); // servidor http
      this.io     = require('socket.io')( this.server ); // servidor de socket

      this.paths = {}

      // Middleware, que son funciones que añadirán otra funcionalidad al server
      // Siempre se ejecutarán cuando nosotros levantemos el servidor
      this.middlewares();

      // Rutas de la aplicación
      this.routes();

      // Configuración de sockets
      this.sockets();
   }

   middlewares() {
      // Activar uso de CORS
      this.app.use( cors() );

      // Publicar la carpeta 'public'
      this.app.use( express.static('public') );
   }

   routes() {
      // this.app.use( this.paths.auth,         require('../routes/auth') );
   }

   sockets() {
      this.io.on('connection', socketController);
   }

   listen() {
      this.server.listen( this.port, () => {
         console.log(`Servidor corriendo en puerto`, this.port);
      });
   }

}

module.exports = Server;