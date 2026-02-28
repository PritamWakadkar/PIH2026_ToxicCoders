const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerController(req,res){
    const {email,username,password,phonenumber} = req.body;


    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"User already exists" + (isUserAlreadyExists.email==email?"Email already exist" : "Username already exist")
        })
    }

    const hash = await bcrypt.hash(password,10)
    
    const user =  await userModel.create({
        email,
        username,
        password:hash,
        phonenumber,
    })

    const token =jwt.sign(
        {
            id:user._id,
        },
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    );

    res.cookie("token",token)

    res.status(201).json({
        message:"User register successfully",
        user:{
            email:user.email,
            username:user.username,
            phonenumber:user.phonenumber,
        }
    })
    
}

async function loginController(req,res){
    const {username,email,password} = req.body;


    const user = await userModel.findOne({
        $or:[
            {
                email:email
            },//condition
            {
                username:username
            }
        ]
    })


    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }
    
    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid password"
        })
    }

    const token =jwt.sign(
        {
            id:user._id,
        },
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    );
    
    res.cookie("token",token)
    
    res.status(201).json({
        message:"User logged-in successfully",
        user:{
            email:user.email,
            username:user.username,
        }
    })
}

module.exports = {
    registerController,
    loginController
}

