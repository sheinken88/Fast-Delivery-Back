import {
    createPackage,
    deletePackage,
} from '../../../services/package.services'
import { Package } from '../../../models'
import setupTestDb, { teardownTestDb } from '../../test-db-setup'

describe('Delete Packages', () => {
    beforeAll(async () => {
        await setupTestDb()
    })

    afterAll(async () => {
        await teardownTestDb()
    })
    it('should delete the package', async () => {
        const newPackageData = {
            status: 'entregado',
            receiver_name: 'Marcelo',
            address: 'Tu direc favorita',
            weight: 2,
            quantity: 4,
        }

        const createdPackage = await createPackage(newPackageData)

        const deleteResult = await deletePackage(createdPackage._id.toString())

        const deletedPackage = await Package.findById(createdPackage._id)

        expect(deleteResult).toBe(true)
        expect(deletedPackage).toBeNull()
    })

    it('should manage error in deletePackage', async () => {
        const errorMessage = 'Error al eliminar el paquete'
        Package.deleteOne = jest.fn().mockRejectedValue(new Error(errorMessage))

        await expect(deletePackage('package-id')).rejects.toThrowError(
            errorMessage
        )

        expect(Package.deleteOne).toHaveBeenCalledTimes(1)
    })
})
