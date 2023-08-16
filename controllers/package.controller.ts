import { type Request, type Response } from 'express'
import { createPackage, getAllPackages } from '../services/package.services'

export const get_all_packages = async (_req: Request, res: Response) => {
    try {
        const packages = await getAllPackages()
        res.status(200).send(packages)
    } catch (error) {
        console.error('Error fetching admins:', error)
        res.sendStatus(500)
    }
}

export const create_package = async (req: Request, res: Response) => {
    try {
        const newPackage = await createPackage(req.body)
        res.status(200).send(newPackage)
    } catch (error) {
        console.error('Error creating admin:', error)
        res.sendStatus(500)
    }
}
