const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username already exists"],
        required:[true,"Username is required"]
    },
    email:{
        type:String,
        unique:[true,"Email already exists"],
        required:[true,"Email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    phonenumber:{
        unique:[true,"Mobile number already exists"],
        type:String,
        required:[true,"number is required"],
        match: /^[0-9]{10}$/,
    },
});

const userModel = mongoose.model("users",userSchema);

module.exports = userModel;  