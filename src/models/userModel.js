const mongoose= require('mongoose')

const bookSchema=new mongoose.Schema({
    bookName: "string",
    authorName: "string",
    category: "string",
    year: "number"
    
}, {timestamps: true} )

module.exports=mongoose.model('Books',bookSchema);