const mongoose = require("mongoose");

//connection string
const mongoURL = "mongodb://127.0.0.1:27017/inotebook";

//connect to the database through the connection string
const connectToUrl = () => {
  mongoose.connect(mongoURL).then(console.log("connection successful"));
};

//export the function 
module.exports = connectToUrl;
