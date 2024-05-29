const loginPanelUser = require("../../../controllers/panel/auth/login.controller");

const router = require("express").Router();

router.route("/login").post(loginPanelUser);

module.exports = router;
