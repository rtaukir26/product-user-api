const express = require("express");
const {
  signUpUser,
  getAllUserDetails,
  getSingleUserInfo,
  updateUser,
  deleteUser,
} = require("../controller/userController");
const router = express.Router();

router.route("/signup-new-user").post(signUpUser);
router.route("/users-detail").get(getAllUserDetails);
router
  .route("/user/:id")
  .get(getSingleUserInfo)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router; //exporting to app
