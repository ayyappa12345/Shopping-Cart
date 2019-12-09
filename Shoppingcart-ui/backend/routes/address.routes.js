const express=require("express");
const router=express.Router();
const checkauth=require("../model/check-auth");

const ctrlAdresses=require("../controller/address.controller");

router.post("/addadress",checkauth, ctrlAdresses.addAddress);
router.get("/getaddress", checkauth, ctrlAdresses.getaddress);
router.delete("/deleteaddress/:id", checkauth, ctrlAdresses.removeaddress);

module.exports=router;