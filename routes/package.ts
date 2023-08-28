import express from 'express'
import {
    create_package,
    get_all_packages,
    edit_package,
    delete_package,
} from '../controllers/package.controller'
const packageRouter = express.Router()

packageRouter.get('/', get_all_packages)
packageRouter.post('/', create_package)
packageRouter.put('/edit', edit_package)
packageRouter.delete('/:id', delete_package)

export default packageRouter
