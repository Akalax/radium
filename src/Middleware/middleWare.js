const logIn=require("../controller/logInCon");
const jwt=require("jsonwebtoken");

const validation=async function(req,res,next){
    let token=req.headers['x-auth-token'];
    let validate=jwt.verify(token,"radium");
    if(validate){
        req.validate=validate;
        next();
    }
    else{
        res.status(200).send({status:"false",msg:"Token is invalid"});
    }
}
module.exports.validation=validation;