const express = require("express");
const router = express.Router();

const {
  getAllAddToCartProducts,
  createAddToCartProduct,
  getSingleAddedProduct,
  updateCartProduct,
} = require("../controller/addToCartController");

router.route("/get-all-selected-products").get(getAllAddToCartProducts);
router.route("/add-product").post(createAddToCartProduct);
router
  .route("/cart-product/:id")
  .get(getSingleAddedProduct)
  .put(updateCartProduct);

module.exports = router; //exporting to app
