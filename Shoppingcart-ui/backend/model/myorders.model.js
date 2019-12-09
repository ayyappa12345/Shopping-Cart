const monogoose=require("mongoose");
const orderScheema=new monogoose.Schema({
    orderTime:{type:Date},
    //address:{type:monogoose.Schema.Types.ObjectId, ref:"Address"},
    creator:{type:monogoose.Schema.Types.ObjectId, ref:"User"},
    totalamount:{type:Number},
    user:{type:monogoose.Schema.Types.ObjectId, ref:"User"},
    products:
        [
          {
            id:{type:String},
            creator:{type:String},
            offerPrice:{type:Number},
            title:{type:String},
            quantity:{type:Number},
            desc:{type:String},
            category:{type:String},
            actualprice:{type:Number},
            price:{type:Number},
            images:{type:String}
        }
        ]
});
monogoose.model("myOrder", orderScheema);