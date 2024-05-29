const router = require("express").Router();

const {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../../../controllers/panel/api/category.controller");

router.route("/categories").get(getCategories).post(addCategory);
router
  .route("/categories/:categoryId")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
