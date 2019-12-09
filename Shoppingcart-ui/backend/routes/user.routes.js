const express=require("express");
const router=express.Router();
const userPic=require("../model/file");
const checkauth=require("../model/check-auth");


const ctrlUser=require("../controller/user.controller");

router.post("/register", userPic, ctrlUser.register);
router.post("/login", ctrlUser.login);
router.get("/profile/:id", checkauth, ctrlUser.profile);
router.put("/updateprofile/:id", userPic, ctrlUser.updaterofile);


module.exports=router;