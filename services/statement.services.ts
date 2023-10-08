import { getTokenData } from '../config/token'
import type IStatement from 'interfaces/statement.interface'
import { Driver, Statement } from '../models'

export const getAllStatements = async () => {
    try {
        const allStatements = await Statement.find()
        return allStatements
    } catch (error) {
        console.error('getAllStatements service error', error)
        throw new Error('getAllStatements service error')
    }
}

export const getDriverStatements = async (driverToken: string) => {
    try {
        const driverData = getTokenData(driverToken)
        const driver = await Driver.findOne({
            email: driverData.email,
        }).populate('statements')
        return driver?.statements
    } catch (error) {
        console.error('getDriverStatements service error', error)
        throw new Error('getDriverStatements service error')
    }
}

export const createStatement = async (
    driverToken: string,
    statement: IStatement
) => {
    try {
        const driverData = getTokenData(driverToken)
        const driver = await Driver.findOne({ email: driverData.email })

        if (driver !== null) {
            const newStatement = await Statement.create(statement)
            driver.statements = [...driver.statements, newStatement]

            await Driver.updateOne(
                { email: driverData.email },
                { $set: { statements: driver.statements } }
            )
            return newStatement
        }
        return statement
    } catch (error) {
        console.error('createStatement service error', error)
        throw new Error('createStatement service error')
    }
}
