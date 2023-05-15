const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    newPassword:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    question:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:false
    }
},{timestamps:true}
);

const usermodel=mongoose.model("userdetails",userSchema)


module.exports={usermodel}