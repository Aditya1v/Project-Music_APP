const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

//API for Register User (artist,user)
async function registerUser(req, res){

  const {username, email, password, role= "user"} = req.body;

  const isUserAlreadyExists = await userModel.findOne({

    //this $or operator is used to check if username with email 1 try to login then it do, basically ye har property(condition) ko check krta hai and agr koi bhi condition satisfy hogi to user return krdega uss prop k
    $or:[
      {username},
      {email}
    ]

  })
  if(isUserAlreadyExists){
    return res.status(409).json({message: "User already exists"})
  }

  const hash = await bcrypt.hash(password, 10) //bcrypt ki help se plaintext ko hash me convert kr rhe hai and ye 10 jo hai ye salt hai jo ki ak random value hai jo server pe jb attack hoga to time delay krega 


  const user = await userModel.create({
    username,
    email,
    password: hash,
    role
  })

  const token = jwt.sign({
    id:user._id,
    role: user.role
  },process.env.JWT_SECRET)

  res.cookie("token" , token)

  res.status(201).json({ 
    message: "User registered successfully",
    user:{
      id:user._id,
      username: user.username,
      email: user.email,
      role: user.role
    }
  })
  

}   

//API for Login User
async function loginUser(req, res){

  const {username,email,password} = req.body;

  const user = await userModel.findOne({
    $or:[
      {username},
      {email}
    ]
  })
  if(!user){
    return res.status(401).json({message: "Invalid credentials"})
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if(!isPasswordValid){
    return res.status(401).json({message:"Invalid credentials"})
  }

  const token = jwt.sign({
    id:user._id,
    role: user.role
  },process.env.JWT_SECRET)

  res.cookie("token" ,token)

  res.status(201).json({ 
    message: "User logged in successfully",
    user:{
      id:user._id,
      username: user.username,
      email: user.email,
      role: user.role
    }
  })

}

//API for Logout User
async function logoutUser(req, res){
  res.clearCookie("token")
  res.status(200).json({message: "User logged out successfully"})
}

module.exports = {registerUser,loginUser,logoutUser};