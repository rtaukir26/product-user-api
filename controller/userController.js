const User = require("../model/userModule");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

//====Sign up user, exporting to routes folder
exports.signUpUser = catchAsyncError(async (req, res, next) => {
  const user = await User.create(req.body); //we can get userSchema validation error

  res.status(201).json({
    success: true,
    message: "new user signup successfully",
    user,
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