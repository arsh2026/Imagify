import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// for Registration
const registerUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        // if anything is not available
        if(!name || !email || !password){
            return res.json({success:false,message:'Missing Details'})
        }

        // encrypt the password (10 is optimal value)
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt)

        // data to be stroed in database
        const userData={
            name,
            email, 
            password:hashedPassword
        }

        const newUser= new userModel(userData)
        const user=await newUser.save() // saving new user in the database

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({success:true,token,user:{name:user.name}})

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// for login
const loginUser = async(req,res)=>{
    try{
        const {email,password}=req.body;
        // finding the user from database
        const user=await userModel.findOne({email})

        if(!user){
            return res.json({success:false, message:'invalid email or password'})
        }
        // if user is available check for password
        const isMatch=await bcrypt.compare(password,user.password)

        if(isMatch){
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token,user:{name:user.name}})

        }else{
             return res.json({success:false, message:'Invalid Credentials'})
        }

    }catch{
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// for user Credits
const userCredits = async(req,res)=>{
    try{
        const {userId} = req.body;
        console.log(userId)
        const user = await userModel.findById(userId)
        res.json({success:true,credits: user.creditBalance,user:{name:user.name}})

    }
    catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export {registerUser, loginUser,userCredits}