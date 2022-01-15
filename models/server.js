const express = require("express");
const cors = require('cors')






class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Middleware
        this.middlewares()
        // Router
        this.routes()
  }

  routes() {
    
    this.app.use('/api/user', require('../routes/user'))
  }
  middlewares(){

    this.app.use(cors())

    this.app.use(express.json())

    this.app.use(express.static('public'))
  }

  listen(){
    this.app.listen(this.port, () => {
        console.log("App listening at port ", this.port);
    });
   
  }
}

module.exports = Server;
