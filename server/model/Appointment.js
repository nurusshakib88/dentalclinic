const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  patientName: String,
  service: String,
  time: String,
  date: Date,
  phone: String,
  msg: String,
  status: {
    type: String,
    default: "waiting",
  },
});

const AppointmentModel = mongoose.model("appointments", AppointmentSchema);

module.exports = AppointmentModel;
