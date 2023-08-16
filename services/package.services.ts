import { Package } from '../models'

export const getAllPackages = async () => {
    try {
        const packages = await Package.find()
        return packages
    } catch (error) {
        console.log('getAllPackages service error', error)
        throw error
    }
}

export const createPackage = async (data: object) => {
    try {
        const newPackage = new Package(data)
        await newPackage.save()
        return newPackage
    } catch (error) {
        console.log('createPackage service error', error)
        throw error
    }
}
