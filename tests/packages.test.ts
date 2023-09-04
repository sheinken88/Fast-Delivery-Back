// import {
//     getAllPackages,
//     createPackage,
//     editPackage,
//     deletePackage,
// } from '../services/package.services'
// import { Package } from '../models'
// import setupTestDb, { teardownTestDb } from './test-db-setup'

// describe('Fetch Packages', () => {
//     beforeAll(async () => {
//         await setupTestDb()
//     })

//     afterAll(async () => {
//         await teardownTestDb()
//     })
//     it('should fetch all Packages', async () => {
//         const mockPackages = [
//             {
//                 status: 'En curso',
//                 receiver_name: 'José Carlos',
//                 address: 'Jose Carlos 123',
//                 weight: 15.2,
//                 quantity: 4,
//             },
//         ]

//         await Package.insertMany(mockPackages)

//         const packages = await getAllPackages()

//         expect(packages).toMatchObject(mockPackages)
//     })

//     it('should manage error in getAllPackages', async () => {
//         const errorMessage = 'Error al obtener paquetes'
//         Package.find = jest.fn().mockRejectedValue(new Error(errorMessage))
//         await expect(getAllPackages()).rejects.toThrowError(errorMessage)
//         expect(Package.find).toHaveBeenCalledTimes(1)
//     })
// })

// describe('Create Packages', () => {
//     beforeAll(async () => {
//         await setupTestDb()
//     })

//     afterAll(async () => {
//         await teardownTestDb()
//     })
//     it('should create a new package', async () => {
//         const newPackageData = {
//             status: 'entregado',
//             receiver_name: 'Marcelo',
//             address: 'Tu direc favorita',
//             weight: 2,
//             quantity: 4,
//         }

//         const createdPackage = await createPackage(newPackageData)

//         const foundPackage = await Package.findOne({ _id: createdPackage._id })

//         if (foundPackage != null) {
//             expect(createdPackage).toMatchObject(foundPackage.toObject())
//         } else {
//             console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH')
//             fail('El paquete no se creo correctamente')
//         }
//     })

//     it('should manage error in createPackage', async () => {
//         await expect(createPackage({})).rejects.toThrow()
//     })

//     it('you cant create a package with empty properties', async () => {
//         const newPackageData = {
//             status: 'entregado',
//             receiver_name: '',
//             address: '',
//             weight: 2,
//             quantity: 4,
//             _id: '64e64f24dde4dcf8d40d20a5',
//         }

//         await expect(createPackage(newPackageData)).rejects.toThrow()
//     })
// })

// describe('Edit Packages', () => {
//     beforeAll(async () => {
//         await setupTestDb()
//     })

//     afterAll(async () => {
//         await teardownTestDb()
//     })
//     it('should edit the package', async () => {
//         const oldPackageData = {
//             status: 'entregado',
//             receiver_name: 'Marcelo',
//             address: 'calle 123',
//             weight: 2,
//             quantity: 4,
//         }

//         const mockPackage = await createPackage(oldPackageData)

//         const newPackageDataForEdit = {
//             status: 'No entregado',
//             receiver_name: 'Adri',
//             address: 'calle 555',
//             weight: 3,
//             quantity: 5,
//         }
//         const result = await editPackage(newPackageDataForEdit, mockPackage._id)

//         expect(result).toMatchObject(newPackageDataForEdit)
//     })

//     it('you cant edit a package with empty properties', async () => {
//         const oldPackageData = {
//             status: 'No entregado',
//             receiver_name: 'Adrian',
//             address: 'street 123',
//             weight: 1,
//             quantity: 1,
//         }

//         const mockPackage = await createPackage(oldPackageData)

//         const newPackageDataForEdit = {
//             status: '',
//             receiver_name: '',
//             address: '',
//             weight: null,
//             quantity: undefined,
//         }

//         await expect(
//             editPackage(newPackageDataForEdit, mockPackage._id)
//         ).rejects.toThrow()
//     })

//     it('should manage error in editPackage', async () => {
//         await expect(editPackage({}, {})).rejects.toThrow()
//     })
// })

// describe('Delete Packages', () => {
//     beforeAll(async () => {
//         await setupTestDb()
//     })

//     afterAll(async () => {
//         await teardownTestDb()
//     })
//     it('should delete the package', async () => {
//         const newPackageData = {
//             status: 'entregado',
//             receiver_name: 'Marcelo',
//             address: 'Tu direc favorita',
//             weight: 2,
//             quantity: 4,
//         }

//         const createdPackage = await createPackage(newPackageData)

//         const deleteResult = await deletePackage(createdPackage._id.toString())

//         const deletedPackage = await Package.findById(createdPackage._id)

//         expect(deleteResult).toBe(true)
//         expect(deletedPackage).toBeNull()
//     })

//     it('should manage error in deletePackage', async () => {
//         const errorMessage = 'Error al eliminar el paquete'
//         Package.deleteOne = jest.fn().mockRejectedValue(new Error(errorMessage))

//         await expect(deletePackage('package-id')).rejects.toThrowError(
//             errorMessage
//         )

//         expect(Package.deleteOne).toHaveBeenCalledTimes(1)
//     })
// })
