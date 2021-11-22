const mongoose= require('mongoose')


const userSchema=new mongoose.Schema({
    name: String,
	balance:{
        type:Number,
        default:100
    },                               // Default balance at user registration is 100
	address:String,
	age: Number,
 	gender:String,                             // Allowed values are - “male”, “female”, “other”
	freeAppUser: {
        type:Boolean,
        default:false
    }                                                 // Default false value

}, {timestamps: true} )

module.exports=mongoose.model('User',userSchema);