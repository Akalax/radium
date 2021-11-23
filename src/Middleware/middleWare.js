const logIn=require("../controller/logInCon");

const validation=async function(req,res,next){
    let data=req.body;
    let name1=data.name;
    let password1=data.password;
    let usercred=await logIn.find({name:name1});
    console.log(usercred);
    let passcred=await logIn.find({password:password1});
    console.log(passcred);
    let isdele=await logIn.find({isDeleted : false});
    console.log(isdele);
    if(!isdele){
        return res.send({msg:"The user does not exist"});
    }
    if(!usercred){
       return res.send({msg:"Username not find"});
    }
    if(!passcred){
       return res.send({msg:"Password is wrong"});
    }
    next();
}
module.exports.validation=validation;