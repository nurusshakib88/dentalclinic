//model/User.jsx

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  age: {
    type: Array,
    required: true,
  },
  shareReg: {
    type: Boolean,
  },
  address: {
    type: String,
  },
  contact: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  userType: {
    type: String,
    default: "user",
  },
  imageUrl: {
    type: String,
    default: "https://i.ibb.co/kqyCsxq/profile.png",
  },
});

const UserModel = mongoose.model("employees", UserSchema);

module.exports = UserModel;
