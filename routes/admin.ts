import express from 'express'
import {
    get_all_admins,
    login_admin,
    logout_admin,
    signup_admin,
} from '../controllers/admin.controller'
const adminRouter = express.Router()

adminRouter.get('/', get_all_admins)
adminRouter.post('/login', login_admin)
adminRouter.post('/signup', signup_admin)
adminRouter.post('/logout', logout_admin)

export default adminRouter
