const express = require("express");
const cors = require('cors');
const { dbConnection } = require("../database/config");
const morgan = require('morgan')






class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Database
        dbConnection()

        // Middleware
        this.middlewares()
        // Router
        this.routes()
        

  }

  routes() {
    
    this.app.use('/api/users', require('../routes/users'))
    this.app.use('/auth', require('../routes/login'))
    this.app.use('/location', require('../routes/location'))
    this.app.use('*', require('../routes/404'))
  }
  middlewares(){

    this.app.use(cors())

    this.app.use(express.json())

    this.app.use(express.urlencoded({extended: true}))

    this.app.use(morgan('dev'))

    this.app.use(express.static('public'))  
    
  }

  listen(){
    this.app.listen(this.port, () => {
        console.log("App listening at port ", this.port);
    });
   
  }

}

module.exports = Server;
