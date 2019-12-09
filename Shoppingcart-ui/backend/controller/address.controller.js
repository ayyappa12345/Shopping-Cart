const mongoose=require("mongoose");
const Addresslist=mongoose.model("Address");

module.exports.addAddress=(req, res, next)=>{
    const addresses=new Addresslist({
    creator:req.userData.id,
    name:req.body.name,
    phone:req.body.phone,
    pincode:req.body.pincode,
    location:req.body.location,
    address:req.body.address,
    city:req.body.city,
    state:req.body.state,
    addtype:req.body.addtype,
    });

    addresses.save().then(result=>{
        if(!result){
            res.status(401).json({
                message:"Error to add Address"
            })
        }
        res.status(200).json({
            message:"Successfully added the Address",
            response:result
        })
    }).catch(err=>{
        res.status(401).json({
            message:"failed to add Address"
        })
    })
};

module.exports.getaddress=(req, res, next)=>{
    Addresslist.find({creator:req.userData.id}).then(result=>{
        if(!result){
            res.status(401).json({
                message:"Error to get Addresses"
            })
        }
        res.status(200).json({
            message:"Successfully fetche the Addresses",
            response:result
        })

    }).catch(err=>{
        res.status(401).json({
            message:"failed to fetch Address"
        })
    })
}

module.exports.removeaddress=(req, res, next)=>{
    
    Addresslist.deleteOne({_id:req.params.id}).then(result=>{
        if(result.n > 0){
            res.status(401).json({
                message:"Successfully deleted the Addres",
                response:result
            })
        }
    }).catch(err=>{
        res.status(401).json({
            message:"failed to delete Address"
        })
    })

}