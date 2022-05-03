const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  name: { type: String, default: null },
  clientId: { type: String, default: null },
  resturantID: { type: String},
  table: { type: String },
  reservationDate: { type: String },
  numberOfPeople: {type: String},
  confirmationNumber:{type:String, unique:true},
  details: { type: String, default: null },
});

module.exports = mongoose.model("reservation", reservationSchema);