const express=require("express");
const router=express.Router();
const checkauth=require("../model/check-auth");

const ctrlmyorder=require("../controller/myorder.controller");


router.post("/myorder", checkauth, ctrlmyorder.myorder);
router.get("/getmyorder",checkauth, ctrlmyorder.getMyorders);

module.exports=router;