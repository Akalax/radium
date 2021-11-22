const user=require("../models/user.js");
const product=require("../models/product.js");
const order=require('../models/order.js');

const userCreation = async function (req,res){     // For User entry
    let data = req.body;
    let savedData = await user.create(data);
    res.send({data: savedData})
}
module.exports.userCreation=userCreation;
//------------------------------------------------------------

const productEntry = async function (req,res){     // For Product entry
    let data = req.body;
    let savedData = await product.create(data);
    res.send({data: savedData})
}
module.exports.productEntry=productEntry;

//--------------Taking order----------------
const takingOrder  = async function (req , res){
    let data = req.body;
    let userId=req.body.user;                 //     Assigned the userr id in variable to check it is valid or not
    let order1 = await order.create(data);
    let productId=req.body.product;          //     Assigned the product id in variable to check it is valid or not
    let validId=await user.findById(userId);
    let product1=await product.findById(productId)

    if(validId && product1)
    {
        let validation=req.headers.freeuserapp;
        if(validation=="true")
        {
            order1.amount=0;
            order1.isFreeAppUser=true;
            order1.save();
            res.send({data:order1});
        }
        else{
            let amountUser=
        }
    }
    else{
        res.send("The userId and Productid is not valid");
    } 
}
module.exports.takingOrder=takingOrder;