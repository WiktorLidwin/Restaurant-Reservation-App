const mongoose = require("mongoose");
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const e = require("cors");
// const uri = "mongodb+srv://WiktorL:edFVNEijolm9DNUe@cluster0.7qrnf.mongodb.net/Sitdown?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// exports.connect = () => {
//   // Connecting to the database
//   client.connect(err => {
//     if (err){
//       console.log("database connection failed. exiting now...");
//       console.error(err);
//     }else{
//       console.log("Successfully connected to database");
//     }
//     const collection = client.db("Sitdown").collection("Sitdown");
//     // perform actions on the collection object
//   });
// };

// const MONGO_URI  = "mongodb://localhost:27017/Users";
const MONGO_URI = "mongodb+srv://WiktorL:edFVNEijolm9DNUe@cluster0.7qrnf.mongodb.net/Sitdown?retryWrites=true&w=majority";
exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};