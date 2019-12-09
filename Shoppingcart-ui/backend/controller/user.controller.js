const mongoose=require("mongoose");
const User=mongoose.model("User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const _=require("lodash");
module.exports.register=(req, res, next)=>{
   const files=req.files;
 console.log(files);
bcrypt.hash(req.body.password, 10).then(hash=>{
    const url=req.protocol+"://"+req.get("host");
    const user=new User({
        fullname:req.body.fullname,
        username:req.body.username,
        phone:req.body.phone,
        gender:req.body.gender,
        email:req.body.email,
        profilePic:req.body.profilePic,
        password:hash
    });
    user.save().then(result=>{
        if(result){
            res.status(200).json({
                message:"User saved",
                response:result
            })
        }
    })
}).catch(err=>{
    console.log(JSON.stringify(err, undefined, 2));
})
}

module.exports.login=(req, res, next)=>{
    var fetcheduser;

    User.findOne({email:req.body.email}).then(user=>{
        fetcheduser=user;
        if(!user){
            res.status(401).json({
                message:"Not authorised",
            })
            
        }
        return bcrypt.compare(req.body.password, user.password)
    }).then(result=>{
        if(!result){
            res.status(401).json({
                message:"Wrong Password",
            })
        }
        const token=jwt.sign({email:fetcheduser.email, id:fetcheduser._id}, process.env.security, {expiresIn:process.env.expires});
        res.status(200).json({
            message:'Logged in user', 
            token:token,
            creator:fetcheduser._id,
            expires:3600
        })
    }).catch(err=>{
        console.log(JSON.stringify(err, undefined, 2))
    })
}

module.exports.profile=(req, res, next)=>{
    User.findById(req.params.id).then(result=>{
        console.log(result);
       const pickeddata= _.pick(result, ['fullname', 'email', 'gender', 'phone', 'username', '_id', 'profilePic'])
        if(result){
            res.status(200).json({
                message:'Profile fetched Successfully',
                response:_.pick(result, ['fullname', 'email', 'gender', 'phone', 'username', '_id', 'profilePic'])
                
            })
        }
    }).catch(err=>{
        res.status(401).json({
            message:'Error to get Profile fetched',
            error:err.error
        })
    })
}

module.exports.updaterofile=(req, res, next)=>{
    console.log("")
    const url=req.protocol+"://"+req.get("host");
    console.log("updated Profile");
    const {body:{fullname, email, gender, phone, username}}=req;
    console.log(url);
    const user=new User({
        fullname, email, gender, phone, username,
        profilePic:url+"/uploads/"+req.file.filename,
    });
    console.log(user.profilePic);
    user.updateOne({_id:req.params.id}, user).then(result=>{
if(result.n > 0){
    res.status(200).json({
        message:'Successfully to get a updated of profile',
        response:result
    })
}
    else{
        res.status(400).json({
           
            response:result
        })
    }
      
       
    }).catch(err=>{
       console.log(JSON.stringify(err, undefined, 2))
    })
}