const mongoose=require("mongoose");
const profileScheema=new mongoose.Schema({
    fullname:{type:String},
    phone:{type:String},
    gender:{type:String},
    username:{type:String},
    email:{type:String},
    creator:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    profilePic:{type:String}
});
mongoose.model("Profile", profileScheema);