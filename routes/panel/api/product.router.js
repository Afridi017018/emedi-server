const {
  addProduct,
  getProducts,
  getProduct,
} = require("../../../controllers/panel/api/product.controller");

const router = require("express").Router();

router.route("/products").post(addProduct).get(getProducts);
router.route("/products/:productId").get(getProduct);

module.exports = router;
