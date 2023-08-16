import express from 'express'
import {
    create_package,
    get_all_packages,
} from '../controllers/package.controller'
const packageRouter = express.Router()

packageRouter.get('/', get_all_packages)
packageRouter.post('/', create_package)

export default packageRouter
