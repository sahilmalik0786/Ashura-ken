import mongoose from 'mongoose'

export const connectToDb = async()=>{
  await mongoose.connect(process.env.MONGODB_URI)
            .then(()=>{
                console.log('connected to db')
            })
            .catch(err => console.log(err))
}