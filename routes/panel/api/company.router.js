const router = require("express").Router();

const {
  addCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
} = require("../../../controllers/panel/api/company.controller");

router.route("/companies").get(getCompanies).post(addCompany);
router
  .route("/companies/:companyId")
  .get(getCompany)
  .put(updateCompany)
  .delete(deleteCompany);

module.exports = router;
