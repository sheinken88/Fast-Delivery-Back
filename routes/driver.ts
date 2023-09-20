import express from 'express'
import {
    get_all_drivers,
    signup_driver,
    login_driver,
    update_driver_profile,
} from '../controllers/driver.controller'
const driverRouter = express.Router()

driverRouter.get('/', get_all_drivers)
driverRouter.post('/login', login_driver)
driverRouter.post('/signup', signup_driver)
driverRouter.put('/:id', update_driver_profile)

export default driverRouter
