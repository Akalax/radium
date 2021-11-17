const mongoose= require('mongoose')

const bookSchema1=new mongoose.Schema({
    bookName:String,
    authorName:String,
    prices:{
        indianPrice:String,
        eropeanPrice:String
    },
    year:{
        type:Number,
        default:2021,
    },
    tags:Array,
    totalpages:Number,
    stockAvailabel:Boolean,
    category:String,
    
}, {timestamps: true} )

module.exports=mongoose.model('Books1',bookSchema1);