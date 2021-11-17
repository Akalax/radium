const bookmodels= require("../models/bookmodels.js") 

const bookCreation = async function (req , res){
    console.log(req.body);
    let data = req.body;

    let savedData = await bookmodels.create(data)
    res.send({msg: savedData})
}

const getBookData = async function (req,res){
    let allBooks = await bookmodels.find().select({ bookName:1, authorName:1})
    res.send({msg: allBooks})
}
        
const getBooksInYear = async function(req,res){
    let a= req.query.b;
    let allBooks = await bookmodels.find({year:a});
    res .send({msg:allBooks});
}

const getXINRBooks = async function(req,res){
    let allBooks=await bookmodels.find({ "prices.indianPrice" : {$in: ["100INR", "200INR", "500INR"] } } );
    res .send({msg:allBooks});
}

const getParticularBooks = async function(req,res){
    let allBooks=await bookmodels.find(req.body);
    res .send({msg:allBooks});
}

const getRandomBooks = async function(req,res){
    let allBooks=await bookmodels.find({ $or: [ {stockAvailable: false} , { totalpages: {$gt: 1080} }   ] } );
    res .send({msg:allBooks});
}
module.exports.bookCreation= bookCreation ;
module.exports.getBookData= getBookData;
module.exports.getBooksInYear= getBooksInYear;
module.exports.getXINRBooks= getXINRBooks;
module.exports.getParticularBooks= getParticularBooks;
module.exports.getRandomBooks= getRandomBooks;