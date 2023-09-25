import express from 'express'
import {
    create_package,
    get_all_packages,
    edit_package,
    delete_package,
    get_pending_packages,
    get_delivered_packages,
} from '../controllers/package.controller'
const packageRouter = express.Router()

packageRouter.get('/', get_all_packages)
packageRouter.get('/pending', get_pending_packages)
packageRouter.get('/delivered', get_delivered_packages)
packageRouter.post('/', create_package)
packageRouter.delete('/delete/:id', delete_package)
packageRouter.put('/edit', edit_package)

export default packageRouter
