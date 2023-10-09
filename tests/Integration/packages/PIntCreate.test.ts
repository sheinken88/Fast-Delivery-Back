import { createPackage } from '../../../services/package.services'
import { Package } from '../../../models'
import setupTestDb, { teardownTestDb } from '../../test-db-setup'

describe('Create Packages', () => {
    beforeAll(async () => {
        await setupTestDb()
    })

    afterAll(async () => {
        await teardownTestDb()
    })
    it('should create a new package', async () => {
        const newPackageData = {
            status: 'entregado',
            receiver_name: 'Marcelo',
            address: 'Tu direc favorita',
            weight: 2,
            quantity: 4,
        }

        const createdPackage = await createPackage(newPackageData)

        const foundPackage = await Package.findOne({ _id: createdPackage._id })

        if (foundPackage !== null) {
            expect(createdPackage).toMatchObject(foundPackage.toObject())
        } else {
            fail('El paquete no se creo correctamente')
        }
    })

    it('should manage error in createPackage', async () => {
        await expect(createPackage({})).rejects.toThrow()
    })

    it('you cant create a package with empty properties', async () => {
        const newPackageData = {
            status: 'entregado',
            receiver_name: '',
            address: '',
            weight: 2,
            quantity: 4,
            _id: '64e64f24dde4dcf8d40d20a5',
        }

        await expect(createPackage(newPackageData)).rejects.toThrow()
    })
})
