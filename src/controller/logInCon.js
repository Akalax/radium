const userLog=require("../models/userLog");
const jwt=require('jsonwebtoken');

const userEntry = async function (req , res){ // For user entry
    let data = req.body;
    let savedData = await userLog.create(data);
    res.send({data: savedData})
}
//----------------user logIn---------------------
const getdata=async function(req,res){
    let data=req.body;
    let name1=data.name;
    let password1=data.password;
    let usercred=await userLog.findOne({name:name1,password:password1,isDeleted : false});
    if(!usercred)
    {
        return res.send({status:"false",msg:"The given credential is not match"});
    }
    else{
        let payload={_id:usercred._id};
        let token= jwt.sign(payload,"radium");//token creation
        console.log(token);
        res.send({status:"True",
        data:usercred,token:token});

    } 
}
//------------------restricted api access by token----------------
const getUserDetail=async function(req,res){

        if(req.validate._id==req.params.userId){
            let user=await userLog.findOne({_id:req.params.userId,isDeleted:false});
            res.send({status:"True",Data:user});
        }
        else{
            res.send({status:"false",msg:"user not found"});
        }
}
//------------protected api change email address------------
const changemail=async function(req,res){
    
        if(req.validate._id==req.params.userId){
            let user=await userLog.findOne({_id:req.params.userId,isDeleted:false});
            user.email=req.body.email;
            //console.log(req.body.email);
            user.save();
            res.send({status:"True",Data:user});
        }
        else{
            res.send({status:"false",msg:"user not found"});
        }
}
module.exports.userEntry=userEntry;
module.exports.getData=getdata;
module.exports.getuserdetail=getUserDetail;
module.exports.changemail=changemail;