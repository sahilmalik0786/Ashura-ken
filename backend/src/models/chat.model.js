import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    title :{
        type:String,
        default:'New Chat'
        // required:true
    },
    lastActivity:{
        type:Date,
        default: Date.now()
    }
} ,{
    timestamps:true
})

export const chatModel = mongoose.model('chats',chatSchema)


