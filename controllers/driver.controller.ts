import { type Request, type Response } from 'express'
import { signupDriver, getAllDrivers } from '../services/driver.services'
import { Driver } from '../models'
import { generateToken } from '../config/token'

export const get_all_drivers = async (_req: Request, res: Response) => {
    try {
        const drivers = await getAllDrivers()
        res.status(200).send(drivers)
    } catch (error) {
        console.error('Error fetching drivers:', error)
        res.sendStatus(500)
    }
}

export const signup_driver = async (req: Request, res: Response) => {
    try {
        const newDriver = await signupDriver(req.body)
        res.status(201).send(newDriver)
    } catch (error) {
        console.error('Error creating driver:', error)
        res.sendStatus(500)
    }
}

export const login_driver = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const driver = await Driver.findOne({ email })
        if (driver == null) throw new Error('Driver not found')

        const isValid = await driver.validatePassword(password)
        if (!isValid) throw new Error('Incorrect data')
        console.log('isValid', isValid)

        // await loginDriver(email, password)

        const { username } = driver
        const token = generateToken({ username, email })

        res.status(200).json(token)
    } catch (error) {
        console.error('Error logging driver', error)
        res.status(500).send('login_driver controller error')
    }
}
