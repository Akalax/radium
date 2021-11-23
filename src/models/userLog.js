const mongoose= require('mongoose')


const userSchema=new mongoose.Schema({
    name : String,
    mobile :Number,
    email : String,
    password : String,
    isDeleted : {
        type:Boolean,
        default:false
    }
}, {timestamps: true} )

module.exports=mongoose.model('userLog',userSchema);