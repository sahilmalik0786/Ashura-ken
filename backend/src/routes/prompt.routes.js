import express from 'express'
import authUser from '../middlewares/auth.middleware.js'
import { getCommunityPrompt, getPromptsController, savePromptController, searchPromptsController } from '../controllers/prompt.controller.js'

const router = express.Router()

/* /api/propmt */
router.post('/saveprompt' , authUser , savePromptController)
router.get('/getprompt' , authUser , getPromptsController)
router.get('/communityprompt' , authUser , getCommunityPrompt)
router.get('/search/:tag' , authUser , searchPromptsController)
export default router