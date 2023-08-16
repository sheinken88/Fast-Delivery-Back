import express from 'express'
import { get_all_admins, create_admin } from '../controllers/admin.controller'
const adminRouter = express.Router()

adminRouter.get('/', get_all_admins)
adminRouter.post('/', create_admin)

export default adminRouter
