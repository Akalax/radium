const authorModels= require("../models/authorModels.js"); 
const authorBookmodels= require("../models/authorBookModels.js"); 


const authorCreation = async function (req , res){ // For author entry
    let data = req.body;
    let savedData = await authorModels.create(data)
    res.send({msg: savedData})
}


 //For book entry
const authorBookCreation = async function (req , res){
    let data = req.body;
    let savedData = await authorBookmodels.create(data)
    res.send({msg: savedData})
}



//   List out of the books of particular author name
const authorFind = async function(req , res){
    let allbooks=await authorModels.find({author_name:"Chetan Bhagat"}).select({author_id:1});
    let id=allbooks[0].author_id;
    let books=await authorBookmodels.find({author_id:id}).select({name:1});
    res.send({msg:books});
}




//Api about changing the price and return author name
const changePrice = async function(req,res){
    let allBooks=await authorBookmodels.findOneAndUpdate({"autorbooks.name":"Two States"},{$set:{price:100}} );
    let authorId=allBooks.author_id;
    let name=await authorModels.find({author_id:authorId}).select({author_name:1,_id:0});
    let price=allBooks.price;
    res.send({authorname:name,cost:price});

}

//Find the book by its cost
const findBook = async function(req,res){
    let allBooks=await authorBookmodels.find({ "prices" : {$gte:50,$lte:100 } } ).select({author_id:1});
    let len=allBooks.length;
    console.log(len);
    let arr=[];
    for(let i=0;i<len;i++) /// Array traversal is perform
    {
        let id=allBooks[i].author_id;
        let books=await authorModels.find({author_id:id}).select({ author_name:1});
        arr.push(books);
    }
    res.send({msg:arr});
}

module.exports.findBook=findBook;
module.exports.changePrice=changePrice;
module.exports.authorFind=authorFind;
module.exports.authorBookCreation=authorBookCreation;
module.exports.authorCreation=authorCreation;