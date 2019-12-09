const mongoose=require("mongoose")

mongoose.connect(process.env.mongoose_URL, (err)=>{
    if(!err){
        console.log("Connected db");
    }
});

require("./user.model");
require("./product.model");
require("./user.item");
require("./myorders.model");
require("./address.model");