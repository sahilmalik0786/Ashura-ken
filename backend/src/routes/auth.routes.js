import express from 'express'
import {registerController , loginController, verifyMeController} from '../controllers/auth.controller.js'
import authmiddleware from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/register', registerController)
router.post('/login' , loginController)
router.get('/getMe',authmiddleware , verifyMeController )


export default router