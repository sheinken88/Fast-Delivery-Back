import { type Request, type Response } from 'express'
import {
    createPackage,
    getAllPackages,
    editPackage,
    deletePackage,
    getPendingPackages,
    getDeliveredPackages,
    getPackageById,
} from '../services/package.services'

export const get_all_packages = async (_req: Request, res: Response) => {
    try {
        const packages = await getAllPackages()
        res.status(200).send(packages)
    } catch (error) {
        console.error('Error fetching packages:', error)
        res.sendStatus(500)
    }
}

export const get_pending_packages = async (_req: Request, res: Response) => {
    try {
        const packages = await getPendingPackages()
        res.status(200).send(packages)
    } catch (error) {
        console.error('Error fetching packages:', error)
        res.sendStatus(500)
    }
}

export const get_package_by_id = async (req: Request, res: Response) => {
    try {
        const foundPackage = await getPackageById(req.params.id)
        res.status(200).send(foundPackage)
    } catch (error) {
        console.error('Error fetching packages:', error)
        res.sendStatus(500)
    }
}

export const get_delivered_packages = async (_req: Request, res: Response) => {
    try {
        const packages = await getDeliveredPackages()
        res.status(200).send(packages)
    } catch (error) {
        console.error('Error fetching packages:', error)
        res.sendStatus(500)
    }
}

export const create_package = async (req: Request, res: Response) => {
    try {
        const newPackage = await createPackage(req.body)
        res.status(200).send(newPackage)
    } catch (error) {
        console.error('Error creating package:', error)
        res.sendStatus(500)
    }
}

export const edit_package = async (req: Request, res: Response) => {
    try {
        const result = await editPackage(req.body.data, req.body._id)
        if (result == null) throw new Error('Error editing package')
        res.status(200).send('edit done succesfully')
    } catch (error) {
        console.error('Error editing package:', error)
        res.sendStatus(500)
    }
}

export const delete_package = async (req: Request, res: Response) => {
    try {
        const destroyedPackage = await deletePackage(req.params.id)

        if (destroyedPackage) {
            res.status(202).send({ message: 'Package deleted successfully' })
        } else {
            res.status(404).send({ message: 'Package not found' })
        }
    } catch (error) {
        console.error('Error deleting package:', error)
        res.sendStatus(500)
    }
}
