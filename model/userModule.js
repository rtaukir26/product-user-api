const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "new user",
      maxLength: [30, "Name can not exceed 30 charactors"],
      minLength: [3, "Name should have more than 3 charactors"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: [validator.isEmail, "Please enter a valid email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [5, "Password should be greater then 6 charactor"],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please enter confirm password"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        // required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  }
  // { timestamps: true }
);

//====bcrypt password
userSchema.pre("save", async function (next) {
  //if passwrd isn't updated then this condition will call bt
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = this.password;
});

//==JWT Token
userSchema.methods.getJWTToken = async function () {
  return await jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
//compare password which is coming frm user while login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("users", userSchema); //exports to userController.js
