const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
  },
  description: { type: String, required: [true, "Please enter description"] },
  price: {
    type: Number,
    required: [true, "Please enter price"],
    maxLength: [8, "please do not enter max 8 digits"],
  },
  rating: { type: Number, default: 0 },
  images: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  category: { type: String, required: [true, "Please enter category"] },
  stock: { type: Number, required: [true, "Please enter stock"], default: 1 },
  numberOfReviews: { type: Number, default: 0 },
  reviews: [
    {
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String },
    },
  ],
  createAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("products", productSchema);//exports to productController.js
