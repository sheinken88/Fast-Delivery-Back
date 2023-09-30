import express from 'express'
import {
    get_all_admins,
    login_admin,
    signup_admin,
    editAdmin,
    secret,
} from '../controllers/admin.controller'
import { validateAdmin } from '../middlewares/auth'
const adminRouter = express.Router()

adminRouter.get('/', validateAdmin, get_all_admins)
adminRouter.put('/edit/:id', validateAdmin, editAdmin)
adminRouter.post('/secret', secret)
adminRouter.post('/login', login_admin)
adminRouter.post('/signup', signup_admin)

export default adminRouter
