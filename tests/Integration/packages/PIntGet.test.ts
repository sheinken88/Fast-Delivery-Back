import { getAllPackages } from '../../../services/package.services'
import setupTestDb, { teardownTestDb } from '../../test-db-setup'
import { Package } from '../../../models'

describe('Fetch Packages', () => {
    beforeAll(async () => {
        await setupTestDb()
    })

    afterAll(async () => {
        await teardownTestDb()
    })
    it('should fetch all Packages', async () => {
        const mockPackages = [
            {
                status: 'En curso',
                receiver_name: 'José Carlos',
                address: 'Jose Carlos 123',
                weight: 15.2,
                quantity: 4,
            },
        ]

        await Package.insertMany(mockPackages)

        const packages = await getAllPackages()

        expect(packages).toMatchObject(mockPackages)
    })

    it('should manage error in getAllPackages', async () => {
        const errorMessage = 'Error al obtener paquetes'
        Package.find = jest.fn().mockRejectedValue(new Error(errorMessage))
        await expect(getAllPackages()).rejects.toThrowError(errorMessage)
        expect(Package.find).toHaveBeenCalledTimes(1)
    })
})
