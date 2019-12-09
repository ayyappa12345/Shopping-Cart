const mongoose= require("mongoose");
const addScheema=new mongoose.Schema({
    creator:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    name:{type:String},
    phone:{type:String},
    pincode:{type:String},
    location:{type:String},
    address:{type:String},
    city:{type:String},
    state:{type:String},
    addtype:{type:String},
});

mongoose.model("Address", addScheema);