const express=require("express");
const { ProductsEnrollment, getAllproducts} = require("../Controllers/productcontroller");
const router=express.Router();

router.post("/create-product",ProductsEnrollment);
router.get("/get-product",getAllproducts);
// router.get("/get-product-details/:id",getProductDetails);

module.exports=router