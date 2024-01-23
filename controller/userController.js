const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../model/userModule");

//====Sign up user, exporting to routes folder
exports.signUpUser = catchAsyncError(async (req, res, next) => {
  // const user = await User.create(req.body); //we can get userSchema validation error
  const { name, email, password, confirmPassword } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    confirmPassword,
    avatar: {
      public_id: "This is sample avatar id",
      url: "this is sample avatar url",
    },
  });

  const token = await user.getJWTToken();

  res.status(201).json({
    success: true,
    message: "Your account created successfully",
    // user,
    token,
  });
});

//====Login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  //checking if user has given email and pwd both
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }
  const user = await User.findOne({ email,password }).select("+password");

  //if user is not in data base
  if (!user) {
    return next(new ErrorHandler("Invalid email or passsord", 401));
  }

  //password checking, is match or not to the existing user
  const isPasswordMatch = user.comparePassword(password); // return -- true/false

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid email or passsord", 401));
  }

  const token = await user.getJWTToken();
  // const {email,password}=user;
//  let userDetails={
//   ...user
//  }
//  delete(userDetails.password)
let userDetails =user._doc
let userFullDetails={
  ...userDetails
}
delete(userFullDetails.password)
  res.status(200).json({
    success: true,
    message: "user login successfully",
    userFullDetails,
    token,
  });
});

//====get all users detail
exports.getAllUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({
    success: true,
    user,
  });
});

//====get single user info
exports.getSingleUserInfo = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//=====update user
exports.updateUser = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    mesaage: "User details updated successfully",
    user,
  });
});

//======Delete user details
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  await user.remove();
  res.status(200).json({
    success: true,
    message: "User account deleted successfully",
  });
});
