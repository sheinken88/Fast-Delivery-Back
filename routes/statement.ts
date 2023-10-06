import express from 'express'
import {
    get_all_statements,
    get_driver_statements,
    create_statement,
} from '../controllers/statement.controller'
import { validateUser, validateAdmin } from '../middlewares/auth'
const statementRouter = express.Router()

statementRouter.get('/', validateAdmin, get_all_statements)
statementRouter.get('/:id', validateAdmin, get_driver_statements)
statementRouter.post('/create', validateUser, create_statement)

export default statementRouter
