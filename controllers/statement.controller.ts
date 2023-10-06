import { type Request, type Response } from 'express'
import type IStatement from 'interfaces/statement.interface'
import {
    getAllStatements,
    getDriverStatements,
    createStatement,
} from '../services/statement.services'

export const get_all_statements = async (_req: Request, res: Response) => {
    try {
        const allStatements: IStatement[] = await getAllStatements()
        res.status(200).send(allStatements)
    } catch (error) {
        console.error('get_all_statements controller error', error)
        throw new Error('get_all_statements controller error')
    }
}

export const get_driver_statements = async (req: Request, res: Response) => {
    try {
        const driverStatements = await getDriverStatements(req.body.token)
        res.status(200).send(driverStatements)
    } catch (error) {
        console.error('get_driver_statements controller error', error)
        throw new Error('get_driver_statements controller error')
    }
}

export const create_statement = async (req: Request, res: Response) => {
    try {
        const newStatement: IStatement = await createStatement(
            req.body.token,
            req.body.statement
        )
        res.status(201).send(newStatement)
    } catch (error) {
        console.error('create_statement controller error', error)
        throw new Error('create_statement controller error')
    }
}
