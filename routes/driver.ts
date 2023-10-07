import express from 'express'
import {
    get_all_drivers,
    signup_driver,
    login_driver,
    update_driver_profile,
    secret,
    get_active_drivers,
} from '../controllers/driver.controller'
import { validateUser, validateAdmin } from '../middlewares/auth'
const driverRouter = express.Router()

driverRouter.get('/', validateAdmin, get_all_drivers)
driverRouter.get('/active', validateAdmin, get_active_drivers)
driverRouter.post('/login', login_driver)
driverRouter.post('/signup', signup_driver)
driverRouter.post('/secret', secret)
driverRouter.put('/:id', validateUser, update_driver_profile)

export default driverRouter
