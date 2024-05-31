const {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
} = require("../../../controllers/panel/api/product.controller");

const router = require("express").Router();

router.route("/products").post(addProduct).get(getProducts);
router.route("/products/:productId").get(getProduct).put(updateProduct);

module.exports = router;
