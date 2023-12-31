import type IPackage from '../interfaces/package.interface'
import { Package } from '../models'
import { type FilterQuery, type UpdateQuery } from 'mongoose'

export const getAllPackages = async () => {
    try {
        const packages = await Package.find()
        return packages
    } catch (error) {
        console.error('getAllPackages service error', error)
        throw error
    }
}

export const getPendingPackages = async () => {
    try {
        const packages = await Package.find({
            status: { $in: ['pending'] },
        })
        return packages
    } catch (error) {
        console.error('getPendingPackages service error', error)
        throw error
    }
}

export const getPackageById = async (id: string) => {
    try {
        const foundPackage = await Package.findOne({ _id: id })
        return foundPackage
    } catch (error) {
        console.error('getPackageById service error', error)
        throw error
    }
}

export const getDeliveredPackages = async () => {
    try {
        const packages = await Package.find({ status: 'delivered' })
        return packages
    } catch (error) {
        console.error('getPendingPackages service error', error)
        throw error
    }
}

export const getInProgressPackages = async () => {
    try {
        const packages = await Package.find({ status: 'in progress' })
        return packages
    } catch (error) {
        console.error('getPendingPackages service error', error)
        throw error
    }
}

export const createPackage = async (data: object) => {
    try {
        const newPackage = new Package(data)
        await newPackage.save()
        return newPackage
    } catch (error) {
        console.error('createPackage service error', error)
        throw error
    }
}

export const editPackageStatus = async (
    newPackageData: object,
    packageId: object
) => {
    try {
        const filter: FilterQuery<IPackage> = { _id: packageId }
        const update: UpdateQuery<IPackage> = { $set: newPackageData }

        const updatedPackage = await Package.findOneAndUpdate(filter, update, {
            new: true,
            runValidators: true,
        })

        return updatedPackage
    } catch (error) {
        console.error('Error en el servicio editPackage', error)
        throw error
    }
}

export const editPackage = async (
    packageId: string,
    newPackageData: object
) => {
    try {
        const filter: FilterQuery<IPackage> = { _id: packageId }
        const update: UpdateQuery<IPackage> = { $set: newPackageData }

        const updatedPackage = await Package.findOneAndUpdate(filter, update, {
            new: true,
            runValidators: true,
        })

        return updatedPackage
    } catch (error) {
        console.error('Error en el servicio editPackage', error)
        throw error
    }
}

export const deletePackage = async (id: string) => {
    try {
        const foundPackage = await Package.findOne({ _id: id })
        if (foundPackage !== null && foundPackage.status === 'pending') {
            const result = await Package.deleteOne({ _id: id })
            return result.deletedCount !== 0
        } else {
            throw new Error(
                'Paquete no encontrado o no está en estado pendiente.'
            )
        }
    } catch (error) {
        console.error('editPackage service error', error)
        throw error
    }
}
