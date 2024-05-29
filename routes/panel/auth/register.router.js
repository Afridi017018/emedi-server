const router = require("express").Router();
const { checkSchema } = require("express-validator");
const {
  panelRegisterValidationSchema,
} = require("../../../validations/register.validator");

const {
  registerPanelUser,
} = require("../../../controllers/panel/auth/register.controller");

router
  .route("/register")
  .post(checkSchema(panelRegisterValidationSchema), registerPanelUser);

module.exports = router;
