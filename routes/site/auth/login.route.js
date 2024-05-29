const router = require("express").Router();
const {
  loginSiteUser,
} = require("../../../controllers/site/auth/login.controller");

router.route("/login").post(loginSiteUser);

module.exports = router;
