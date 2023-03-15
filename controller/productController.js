const Product = require("../model/productModule");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

//====Create Product -- Admin, exporting to routes folder
exports.createProduct = catchAsyncError(async (req, res, next) => {
  // const product = await new Product(req.body);
  // product.save();//use this line when we are using "new Product(req.body);"
  const product = await Product.create(req.body); //we can get productSchema validation error

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});
// exports.createProduct = async (req, res, next) => {
//   try {
//     const product = await new Product(req.body);
//     if (!product.name) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }
//     console.log("hii",product)
//     product.save();
//     res.status(201).json({
//       success: true,
//       message: "Product created successfully",
//       product,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err,
//     });
//   }
// };

//=====get all products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const product = await Product.find();
  res.status(200).json({
    success: true,
    product,
  });
});

//=====get single product details
exports.getSingleProducts = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });

  // try {
  //   const product = await Product.findById(req.params.id);
  //   if (!product) {
  //     return res.status(500).json({
  //       success: false,
  //       message: "Product not founf",
  //     });
  //   }
  //   res.status(200).json({
  //     success: true,
  //     product,
  //   });
  // } catch (err) {
  //   res.status(404).json({
  //     success: false,
  //     message: "Product not found",
  //   });
  // }
});

//=====update product -- Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  // if (!product) {
  //   return res.status(500).json({
  //     success: false,
  //     message: "Product not found",
  //   });
  // }
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    mesaage: "Product updated successfully",
    product,
  });
});

//======Delete product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
