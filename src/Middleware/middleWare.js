const logIn=require("../controller/logInCon");
const jwt=require("jsonwebtoken");

const validation=async function(req,res,next){
    let token=req.headers['x-auth-token'];
    let validate=jwt.verify(token,"radium");
    if(validate){
       // req.validate=validate;
       if(validate._id==req.params.userId)
       {
           next();
        }
      else {
               res.send({status:"false",msg:"user not found"});
           }   
    }
    else{
        res.status(200).send({status:"false",msg:"Token is invalid"});
    }
}
module.exports.validation=validation;