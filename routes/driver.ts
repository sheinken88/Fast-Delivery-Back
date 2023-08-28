import express from 'express'
import {
    get_all_drivers,
    signup_driver,
    login_driver,
    logout_driver,
} from '../controllers/driver.controller'
const driverRouter = express.Router()

driverRouter.get('/', get_all_drivers)
driverRouter.get('/login', login_driver)
driverRouter.post('/logout', logout_driver)
driverRouter.post('/signup', signup_driver)

export default driverRouter
