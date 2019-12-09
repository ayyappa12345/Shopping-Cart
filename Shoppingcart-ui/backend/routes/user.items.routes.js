const express=require("express");
const router=express.Router();
const checkAuth=require("../model/check-auth");

const ctrlUseritems=require("../controller/user.item.controller");

router.post("/addcart", checkAuth, ctrlUseritems.addcart);
router.get("/getcartitems", checkAuth, ctrlUseritems.getcartItems);
router.put("/updatecartitem/:id", checkAuth, ctrlUseritems.updatecartItem);
router.delete("/deletecart/:id", checkAuth, ctrlUseritems.deletecartitem);
router.delete("/deleteallcart", checkAuth, ctrlUseritems.deleteallcartitems);

module.exports=router;