const router = require("express").Router();

const panelRoutes = require("./panel/index");
const siteRoutes = require("./site/index");

// Panel Routes
router.use("/panel", panelRoutes);
router.use("/site", siteRoutes);

module.exports = router;
