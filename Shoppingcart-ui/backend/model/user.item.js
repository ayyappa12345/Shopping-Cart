const mongoose=require("mongoose");
const itemScheema=new mongoose.Schema({
    title:{type:String},
    price:{type:Number},
    quantity:{type:Number},
    desc:{type:String},
    images:{type:String},
    category:{type:String},
    actualprice:{type:Number},
    creator:{type:mongoose.Schema.Types.ObjectId, ref:"User"}
});

mongoose.model("Item", itemScheema);

