const express = require("express");
const cors = require('cors');
const { dbConnection } = require("../database/config");
const hbs = require('hbs');
const morgan = require('morgan')






class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Database
        dbConnection()
        // hbs
        this.hbs()

        // Middleware
        this.middlewares()
        // Router
        this.routes()
        

  }

  routes() {
    
    this.app.use('/api/user', require('../routes/users'))
    this.app.use('/login', require('../routes/login'))
  }
  middlewares(){

    this.app.use(cors())

    this.app.use(express.json())

    this.app.use(morgan('dev'))

    this.app.use(express.static('public'))
  }

  listen(){
    this.app.listen(this.port, () => {
        console.log("App listening at port ", this.port);
    });
   
  }
  hbs(){
    hbs.registerPartials('/home/fasedaff/Programming/robin_book/node/07-restserver/views/partials',  (err) => {});
    this.app.set('view engine', 'hbs')
  }
}

module.exports = Server;
