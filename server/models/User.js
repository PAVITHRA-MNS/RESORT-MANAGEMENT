const mongoose=require("mongoose")

const UserSchema=mongoose.Schema({
    name:String,
    mail: {type:String,required:true,unique:true},
    password:String,
})

const userModel=mongoose.model("User",UserSchema);

module.exports=userModel;