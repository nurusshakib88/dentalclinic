const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  title: String,
  desc: String,
  imageUrl: String,
});

const ServiceModel = mongoose.model("services", ServiceSchema);

module.exports = ServiceModel;
