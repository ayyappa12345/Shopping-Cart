const mongoose=require("mongoose");
const myOrder=mongoose.model("myOrder");
const moment=require("moment")

module.exports.myorder=(req, res, next)=>{
    console.log(req);
    if(req.body.length>0){
        var tempArray = [];
        for(var i=0;i<req.body.length>0;i++){
            const {id, creator, offerPrice, title, quantity, desc, category, actualprice, price, images}=req.body[i];
            tempArray.push({
                title,quantity,desc,category,actualprice,price,images, id, creator, offerPrice
            });
        }
    }
   const total=tempArray.reduce((a,b)=>{
    return a+(b.price*b.quantity);
}, 0);
    const myorder=new myOrder({
    orderTime:new Date(),
    totalamount:total,
    user:req.userData.id,
    products:tempArray
    });
    myorder.save().then(result=>{
        console.log(result);
        if(!result){
            res.status(401).json({
                message:'Error to save in my orders',
            })
            return false;
        }
        res.status(200).json({
            message:'Successfully puchard the items',
            response:result
        })

    }).catch(err=>{
        console.log(JSON.stringify(err, undefined, 2))
    })
}


module.exports.getMyorders=(req, res, next)=>{
    myOrder.find({user:req.userData.id}).then(result=>{
        if(!result){
            res.status(401).json({
                message:'Error to get my orders',
            })
            return false;
        }
        res.status(200).json({
            message:'Successfully get my orders',
            response:result,
            products:result.products

        })
        return false;
    }).catch(err=>{
        res.status(401).json({
            message:'Failed to get my orders',
        })
    })
}