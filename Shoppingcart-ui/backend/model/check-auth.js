const jwt=require("jsonwebtoken");

module.exports=(req, res, next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        const decodedToken=jwt.verify(token, process.env.security);
        req.userData={email:decodedToken.email, id:decodedToken.id};
        console.log("From checkauth"+req.userData.id);
        next();
    }
    catch(error){
       
        res.status(422).json({
            message:"You are not authorized"
        })
    }
}