import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'


import authRoutes from './routes/auth.routes.js'
import chatRoutes from './routes/chat.routes.js'
import promptRoutes from './routes/prompt.routes.js'

const app = express()



// Middleware
app.use(cors({
    origin:'http://localhost:5173' || process.env.FRONTEND_URL,
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

// Using Routes
app.use('/api/auth' , authRoutes)
app.use('/api/chat' , chatRoutes)
app.use('/api/prompt' , promptRoutes)
app.get('/' , (req,res)=>{
    res.json({
        message:'runnig'
    })
})


export default app
