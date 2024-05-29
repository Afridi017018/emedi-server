const router = require("express").Router();
const {
  registerSiteUser,
} = require("../../../controllers/site/auth/register.controller");

router.route("/register").post(registerSiteUser);

module.exports = router;
