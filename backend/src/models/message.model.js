import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    chat:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'chats'
    },
    content:{
        type: String,

    },
    role:{
        type:String,
        enum:['user', 'model'],
        default:'user'
    }
},{
    timestamps:true
})


const messageModel = mongoose.model('messages',messageSchema)
export default messageModel