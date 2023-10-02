import express from 'express'
import {
    create_package,
    get_all_packages,
    edit_package,
    delete_package,
    get_pending_packages,
    get_delivered_packages,
    get_in_progress_packages,
} from '../controllers/package.controller'
import { validateUser, validateAdmin } from '../middlewares/auth'
const packageRouter = express.Router()

packageRouter.get('/', validateAdmin, get_all_packages)
packageRouter.get('/pending', validateUser, get_pending_packages)
packageRouter.get('/delivered', validateAdmin, get_delivered_packages)
packageRouter.get('/in-progress', validateAdmin, get_in_progress_packages)
packageRouter.post('/', validateAdmin, create_package)
packageRouter.delete('/delete/:id', validateAdmin, delete_package)
packageRouter.put('/edit', validateAdmin, edit_package)

export default packageRouter
