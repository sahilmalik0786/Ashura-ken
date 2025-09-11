import jwt from 'jsonwebtoken'
import { userModel } from '../models/user.model.js'

const authmiddleware = async(req,res,next)=>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Invalid token or token not found"
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        const user = await userModel.findOne({
            _id:decoded.id
        }).lean()
        const filteredUser = {
            _id:user._id,
            username:user.username,
            email:user.email,
            avatar:user.avatar
        }
        req.user = filteredUser
        next()
    } catch (error) {
        res.status(400).json({
            message:"Unauthorized Attempt"
        })
        console.log(error)
    }
}

export default authmiddleware