const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



async function registerController(req, res) {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ username }, { email }]
    });

    if (isUserAlreadyExists) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      email,
      username,
      password: hash,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // production me true
    });

    return res.status(201).json({
      message: "User registered successfully"
    });

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    return res.status(500).json({
      message: err.message
    });
  }
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

async function handleLogout(){
  try {
    await API.post("/auth/logout"); // ya jo tera route hai
  } catch (error) {
    console.log(error);
  } finally {
    localStorage.removeItem("token");
    navigate("/");
  }
};

module.exports = {
    registerController,
    loginController,
    handleLogout,
}

