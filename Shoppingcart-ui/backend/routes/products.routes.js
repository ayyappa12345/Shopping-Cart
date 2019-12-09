const express=require("express");
const router=express.Router();
const productPic=require("../model/file");
const checkauth=require("../model/check-auth");

const ctrlProducts=require("../controller/product.controller");

router.post("/addproduct",checkauth,productPic, ctrlProducts.addproduct);
router.get("/getproducts", ctrlProducts.getproducts);
router.get("/getproducts/:category", ctrlProducts.getproducts);
router.get("/getproduct/:id", ctrlProducts.getproduct);

module.exports=router;