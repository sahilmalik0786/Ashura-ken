import express from 'express'
import authUser from '../middlewares/auth.middleware.js'
import { chatController , userChatsController ,chatsHistoryController } from '../controllers/chat.controller.js'
const router = express.Router()

// /api/chatId
router.post('/chatid', authUser , chatController)
router.get('/chats' , authUser , userChatsController )
router.post('/chathistory' , authUser , chatsHistoryController )

export default router