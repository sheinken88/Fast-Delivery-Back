import type IPackage from '../interfaces/package.interface'
import { Package } from '../models'
import { type FilterQuery, type UpdateQuery } from 'mongoose'

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

export const editPackage = async (
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
        console.log('Error en el servicio editPackage', error)
        throw error
    }
}

// export const editPackage = async (data: IPackage, _id: Object) => {
//     try {
//         const { status, receiver_name, address, weight, quantity } = data

//         const packageToEdit = await Package.findOneAndUpdate(
//             { _id },
//             {
//                 $set: {
//                     status,
//                     receiver_name,
//                     address,
//                     weight,
//                     quantity,
//                 },
//             },
//             { new: true }
//         )

//         if (!packageToEdit) {
//             throw new Error('Package not found')
//         }

//         return packageToEdit
//     } catch (error) {
//         console.log('editPackage service error', error)
//         throw error
//     }
// }

export const deletePackage = async (id: string) => {
    try {
        const result = await Package.deleteOne({ _id: id })
        return result.deletedCount !== 0
    } catch (error) {
        console.log('editPackage service error', error)
        throw error
    }
}
