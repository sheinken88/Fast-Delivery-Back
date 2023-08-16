import { type Request, type Response } from 'express'
import { createDriver, getAllDrivers } from '../services/driver.services'

export const get_all_drivers = async (_req: Request, res: Response) => {
    try {
        const drivers = await getAllDrivers()
        res.status(200).send(drivers)
    } catch (error) {
        console.error('Error fetching drivers:', error)
        res.sendStatus(500)
    }
}

export const create_driver = async (req: Request, res: Response) => {
    try {
        const newDriver = await createDriver(req.body)
        res.status(200).send(newDriver)
    } catch (error) {
        console.error('Error creating driver:', error)
        res.sendStatus(500)
    }
}
