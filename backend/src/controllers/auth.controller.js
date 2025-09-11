import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { userModel } from '../models/user.model.js'

export const registerController = async(req, res)=>{
    const {username , email , password} = req.body

    const isUserExists = await userModel.findOne({
        $or:[
            {username:username},
            {email:email}
        ]
    })

    if(isUserExists){
        return res.status(400).json({
            message:'This user is already exists'
        })
    }

    const user = await userModel.create({
        username:username,
        email:email,
        password:await bcrypt.hash(password , 10)
    })

    const token = jwt.sign({id:user._id} , process.env.JWT_SECRET_KEY)
    res.cookie('token', token , {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/'
    })
    // const filteredUser = {
    //     username : user.username,
    //     email : user.email
    // }
    res.status(201).json({
        message:'User created successfully',
        
    })
}

export const loginController = async(req,res)=>{
    const {userCredential , password} = req.body 
     
    const user = await userModel.findOne({
        $or:[
            {username:userCredential},
            {email:userCredential}
        ]
    }).lean()

    if(!user){
        return res.status(401).json({
            message:"there is no user with this email and username"
        })
    }
    
    const isPasswordValid = await bcrypt.compare(password , user.password)
    if(!isPasswordValid){
        return res.status(401).json({
            message:"Unauthorized Attempt ! Invalid password"
        })
    }

    const token = jwt.sign({id:user._id} , process.env.JWT_SECRET_KEY)
     res.cookie('token', token , {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/'
    })
    // const filteredUser = {
    //     username:user.username,
    //     email:user.email
    // }
    res.status(200).json({
        message:'Loggedin Successfully',
        
    })
}

export const verifyMeController = async(req,res)=>{
    const user = req.user;
    
  

    res.status(200).json({
        message:"User verified sucessfully",
        user
    })
}