const express = require("express");
const cors = require("cors");
const hbs = require("hbs");
const {dbConnection} = require('../database/config')

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //DB Connection
    dbConnection()

    // Middleware
    this.middlewares();
    // Router
    this.routes();
  }

  routes() {
    this.app.use(["/user", "/login"], require("../routes/users"));
    this.app.use('/dashboard', require('../routes/dashboard'))
    this.app.get('*', (req, res) => {
      res.render('404')
    })
    }
  
  middlewares() {
    hbs.registerPartials( '/home/rivo/Programming/Node/03-Login-Crud/RestServer-Node/views/partials', (err) => {});



    this.app.set("view engine", "hbs");

    this.app.use(express.static("public"));

    // esto es para recibir del input
    this.app.use(express.urlencoded({ extended: false }));

    this.app.use(cors());

    this.app.use(express.json());


  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("App listening at port ", this.port);
    });
  }
}

module.exports = Server;
