const mongoose=require("mongoose");
const Product=mongoose.model("Product");



module.exports.addproduct=(req, res, next)=>{
    const url=req.protocol+"://"+req.get("host");
    console.log(req);
    console.log(req.UserData);
    const product=new Product({
        title:req.body.title,
        price:req.body.price,
        category:req.body.category,
        desc:req.body.desc,
        creator:req.userData.id,
        actualprice:req.body.actualprice,
        images:url+"/uploads/"+req.file.filename,
    });
    console.log(product);
    product.save().then(result=>{
        if(!result){
            res.status(401).json({
                message:'Faile to add a item into product'
            })
    
        }
        res.status(200).json({
            message:'Success to add a item into product',
            response:result
        })
    
    }).catch(err=>{
        res.status(401).json({
            message:'Error to add a item into product'
        })
    })
    };

    module.exports.getproducts=(req, res, next)=>{
        Product.find().then(result=>{
            res.status(200).json({
                message:'Successfully to get a items of product',
                products:result
            })
        })
        .catch(err=>{
            res.status(401).json({
                message:'Error to get a items of product'
            })
        })
    };

    module.exports.getmenproducts=(req, res, next)=>{
        Product.find({category:req.params.category}).then(result=>{
            res.status(200).json({
                message:'Successfully to get a items of product',
                products:result
            })
        })
        .catch(err=>{
            res.status(401).json({
                message:'Error to get a items of product'
            })
        })
    };


    module.exports.getproduct=(req, res, next)=>{
        Product.findOne({_id:req.params.id}).then(result=>{
            res.status(200).json({
                message:'Successfully to get a items of product',
                 response:result
            })
        })
        .catch(err=>{
            res.status(401).json({
                message:'Error to get a items of product'
            })
        })
    };