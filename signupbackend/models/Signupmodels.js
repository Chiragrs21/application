const mongoose = require("mongoose");

const signuptemplates = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  mothername: {
    type: String,
    required: true,
  },
  fathername: {
    type: String,
    required: true,
  },
  adharrcard: {
    type: String,
    required: true,
  },
  schoolname: {
    type: String,
    required: true,
  },
  registration: {
    type: String,
    required: true,
  },
  totalmarks: {
    type: String,
    required: true,
  },
  voterid: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("mytabel", signuptemplates);
