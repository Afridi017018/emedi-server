const router = require("express").Router();

const panelRegisterRouter = require("./auth/register.router");
const panelLoginRouter = require("./auth/login.router");
const panelGenericRouter = require("./api/generic.router");
const panelCompanyRouter = require("./api/company.router");
const panelCategoryRouter = require("./api/category.router");
const panelProductRouter = require("./api/product.router");

// Auth

router.use(panelRegisterRouter);
router.use(panelLoginRouter);

// Api

router.use(panelGenericRouter);
router.use(panelCompanyRouter);
router.use(panelCategoryRouter);
router.use(panelProductRouter);

module.exports = router;
