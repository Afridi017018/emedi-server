const router = require("express").Router();

const { verifyJWT } = require("../../../middlewares/verify-jwt");
const { verifyRoles } = require("../../../middlewares/verify-roles");

const {
  addGeneric,
  getGenerics,
  getGeneric,
  updateGeneric,
  deleteGeneric,
} = require("../../../controllers/panel/api/generic.controller");

router
  .route("/generics")
  .get(getGenerics)
  .post(addGeneric)
  // .post(verifyJWT, verifyRoles("ADMIN"), addGeneric);

router
  .route("/generics/:genericId")
  .get(getGeneric)
  .put(updateGeneric)
  .delete(deleteGeneric);

module.exports = router;
