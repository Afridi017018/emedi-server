const router = require("express").Router();

const {
  addUserAddress,
  getUserAddresses,
} = require("../../../controllers/site/api/address.controller");

const { verifyJWT } = require("../../../middlewares/verify-jwt");

router
  .route("/addresses")
  .post(verifyJWT, addUserAddress)
  .get(verifyJWT, getUserAddresses);

module.exports = router;
