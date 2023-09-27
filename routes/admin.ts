import express from 'express'
import {
    get_all_admins,
    login_admin,
    signup_admin,
} from '../controllers/admin.controller'
import { validateUser } from '../middlewares/auth'
const adminRouter = express.Router()

adminRouter.get('/', validateUser, get_all_admins)
adminRouter.post('/login', validateUser, login_admin)
adminRouter.post('/signup', validateUser, signup_admin)

export default adminRouter
