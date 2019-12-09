const mongoose=require("mongoose");
const userScheema=new mongoose.Schema({
    fullname:{type:String},
    phone:{type:String},
    gender:{type:String},
    username:{type:String},
    email:{type:String},
    password:{type:String},
    profilePic:{type:String}
});
mongoose.model("User", userScheema);