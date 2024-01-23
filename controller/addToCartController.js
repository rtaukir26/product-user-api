const AddToCart = require("../model/addToCartModule");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

//====Create Add To Cart Product, exporting to routes folder
exports.createAddToCartProduct = catchAsyncError(async (req, res, next) => {
  // const addToCart = await new AddToCart(req.body);
  // addToCart.save();//use this line when we are using "new Product(req.body);"
  // console.log("req>", req.body);
  const {
    name,
    description,
    price,
    rating,
    category,
    stoke,
    numberOfReviews,
    quantity,
    _id,
  } = req.body;
  const addToCart = await AddToCart.create({
    name,
    description,
    price,
    rating,
    category,
    stoke,
    numberOfReviews,
    quantity,
    _id,
  }); //we can get addToCartSchema validation error
  // console.log("req added", addToCart);
  res.status(201).json({
    success: true,
    message: "Product added successfully",
    addToCart,
  });
});

//get all added products
exports.getAllAddToCartProducts = catchAsyncError(async (req, res, next) => {
  const addToCart = await AddToCart.find();
  res.status(200).json({
    success: true,
    addToCart,
  });
});

//get single added product
exports.getSingleAddedProduct = catchAsyncError(async (req, res, next) => {
  const singleProduct = await AddToCart.findById(req.params.id);
  if (!singleProduct) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    singleProduct,
  });
});
//update cart product
exports.updateCartProduct = catchAsyncError(async (req, res, next) => {
  let cartProduct = await AddToCart.findById(req.params.id);
  if (!cartProduct) {
    return next(new ErrorHandler("Product not found", 404));
  }

  cartProduct = await AddToCart.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message:"product updated successfully",
    cartProduct,
  });
});
