const mongoose=require("mongoose");
const Item=mongoose.model("Item");
const checkauth=require("../model/check-auth")

module.exports.addcart=(req, res, next)=>{
    console.log(req.body);

const cartItem=new Item({
    title:req.body.title,
    price:req.body.price,
    quantity:req.body.quantity,
    category:req.body.category,
    desc:req.body.desc,
    actualprice:req.body.actualprice,
    creator:req.userData.id,
    images:req.body.images

})
cartItem.save().then(result=>{
    console.log(result);
    if(!result){
        res.status(401).json({
            message:'Faile to add a item into cart'
        })

    }
    res.status(200).json({
        message:'Success to add a item into cart',
        response:result
    })

}).catch(err=>{
    res.status(401).json({
        message:'Error to add a item into cart'
    })
})
};


module.exports.getcartItems=(req, res, next)=>{

    Item.find({creator:req.userData.id}).then(result=>{
        res.status(200).json({
            message:'Successfully to get a items of cart',
            response:result
        })
    })
    .catch(err=>{
        res.status(401).json({
            message:'Error to get a items of cart'
        })
    })
};


module.exports.deleteallcartitems=(req, res, next)=>{
    Item.deleteMany({creator:req.userData.id}).then((result)=>{
        console.log(result);
    }).catch(err=>{
        console.log("Error deleting all docs");
    })
}

module.exports.updatecartItem=(req, res, next)=>{
    console.log(req.params.id);
    const {body:{title, price, quantity, category, desc, actualprice, images}}=req;
    const cartItem=new Item({
        _id:req.body.id,
        creator:req.userData.id,
        title,
        price,
        quantity,
        category,
        desc,
        actualprice,
        images
    
    })

    Item.updateOne({_id:req.params.id, creator:req.userData.id}, cartItem).then(result=>{
console.log("result  "+ result);
        if(result.n > 0){
            res.status(200).json({
                message:'Successfully to get a items of cart',
                response:result
            })
        }
        else{
            res.status(401).json({
                message:'Not Authorized user',
            })
        }
    })
    .catch(err=>{
        console.log(JSON.stringify(err, undefined, 2));
        res.status(401).json({
            message:'Error to update a items of cart'
        })
    })
};



module.exports.deletecartitem=(req, res, next)=>{
    console.log(res);
    Item.deleteOne({_id:req.params.id}).then(result=>{
        if(result.n > 0){
            res.send(200).json({
                message:"Cart item Deleted",
                response:result
            })
        }
    }).catch(err=>{
        res.send(401).json({
            message:"Errot to delete Cart item ",

        })
    })
}








