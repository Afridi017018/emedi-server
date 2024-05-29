const router = require("express").Router();

const siteRegisterRouter = require("./auth/register.route");
const siteLoginRouter = require("./auth/login.route");

const addressRouter = require("./api/address.router");

// Auth Routes

router.use(siteRegisterRouter);
router.use(siteLoginRouter);

// API Routes
router.use(addressRouter);

module.exports = router;
