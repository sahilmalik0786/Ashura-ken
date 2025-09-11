import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar:{
    type: String,
    default:'https://ik.imagekit.io/sf0ybmgwy/caption_generator/avatarImg.jpg?updatedAt=1754378187345'
  } 

 },{
  timestamps:true
 });

export const userModel = mongoose.model('User', userSchema)
