import express from 'express'
import { login, register } from '../controller/auth'
import { checkCurrentUser } from '../middleware/checkCurrentUser'
import { getCurrentUser } from '../controller/auth'

const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.get('/', checkCurrentUser, getCurrentUser)

export default router