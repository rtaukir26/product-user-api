const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true,default:"new user" },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    trim: true,
  },
  password: { type: String, required: [true, "Please enter your password"] },
  confirmPassword: {
    type: String,
    required: [true, "Please enter confirm password"],
  },
});

module.exports = mongoose.model("users", userSchema); //exports to userController.js
