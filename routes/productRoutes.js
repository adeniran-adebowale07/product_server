const express = require("express");
const router= express.Router();
const controller= require("../controllers/productController")



router.get("/",controller.getProducts);

router.get(`/:id`,controller.getProductByID);

router.patch(`/:id`, controller.updateProduct);

router.post("/",controller.createProduct);

router.delete(`/:id`, controller.deleteProduct);

module.exports = router;