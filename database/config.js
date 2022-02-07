const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, 
    );

    console.log("Base de datos online");
  } catch (error) {
    console.log(error);
    throw new Error("Conexion db fallo");
  }
};

module.exports = {
  dbConnection,
};
