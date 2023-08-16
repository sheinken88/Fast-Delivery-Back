import express from 'express'
import {
    get_all_drivers,
    create_driver,
} from '../controllers/driver.controller'
const driverRouter = express.Router()

driverRouter.get('/', get_all_drivers)
driverRouter.post('/', create_driver)

export default driverRouter
