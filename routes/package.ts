import express from 'express'
import {
    create_package,
    get_all_packages,
    edit_package,
    delete_package,
    get_pending_packages,
    get_delivered_packages,
} from '../controllers/package.controller'
import { validateUser } from '../middlewares/auth'
const packageRouter = express.Router()

packageRouter.get('/', validateUser, get_all_packages)
packageRouter.get('/pending', validateUser, get_pending_packages)
packageRouter.get('/delivered', validateUser, get_delivered_packages)
packageRouter.post('/', validateUser, create_package)
packageRouter.delete('/delete/:id', validateUser, delete_package)
packageRouter.put('/edit', validateUser, edit_package)

export default packageRouter
