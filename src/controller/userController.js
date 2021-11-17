const UserModel= require("../models/userModel.js") 

const createUser = async function (req , res){
    let data = {
        "bookName" : req.body.bookName,
        "authorName": req.body.authorName,
        "category" : req.body.category,
        "year" : req.body.year
    }

    let savedData = await UserModel.create(data)
    res.send({msg: savedData})
}

const getUsersData = async function (req,res){
    let allUsers = await UserModel.find()
    res.send({msg: allUsers})
}
        
module.exports.createUsers = createUser 
module.exports.getUsersData= getUsersData
