const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    try{
        const token=req.header('x-auth-token');
        jwt.verify(token,process.env.JWT_SECRET);
        console.log(token);
        next();
    }
    catch(error){
        res.send({err:err.message});
    }
}

module.exports=auth;