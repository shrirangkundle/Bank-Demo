const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is must"],
    trim: true,
    maxlength: [20, "max len is 20"],
  },
  surname: {
    type: String,
    required: [true, "surname is must"],
    trim: true,
    maxlength: [20, "max len is 20"],
  },
  dob: {
    type: String,
    required: [true, "age is must"],
  },
  username: {
    type: String,
    required: [true, "age is must"],
  },
  password: {
    type: String,
    required: [true, "school is must"],
    trim: true,
    maxlength: [20, "max len is 20"],
  },
  balanceAmt: {
    type: Number,
    default: 0,
  },
  userTransAction: [],
});

module.exports = mongoose.model("user", userSchema);
