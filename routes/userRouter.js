const express = require("express");
const router = express.Router();
const {
  signUpUser,
  getAllUserDetails,
  getSingleUserInfo,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controller/userController");

router.route("/register").post(signUpUser);
router.route("/users-detail").get(getAllUserDetails);
router.route("/login").post(loginUser);
router
  .route("/user/:id")
  .get(getSingleUserInfo)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router; //exporting to app.js and server.js