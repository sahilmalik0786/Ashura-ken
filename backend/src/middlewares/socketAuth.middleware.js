import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import { userModel } from '../models/user.model.js'


export const  socektAuth = async(socket,next) =>{
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "")
   
    if(!cookies.token){
        next(new Error('Authentication error : NO TOKEN PROVIDED'))
    }
    
    try{
        const decoded = jwt.verify(cookies.token,process.env.JWT_SECRET_KEY)
        const user = await userModel({
            _id:decoded.id
        })
        socket.user = user
        next()
    }catch(err){
        next(new Error('Authenticaion error : Invalid Token'))
    }
}