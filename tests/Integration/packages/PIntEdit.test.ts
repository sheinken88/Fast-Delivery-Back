import { createPackage, editPackage } from '../../../services/package.services'
import setupTestDb, { teardownTestDb } from '../../test-db-setup'

describe('Edit Packages', () => {
    beforeAll(async () => {
        await setupTestDb()
    })

    afterAll(async () => {
        await teardownTestDb()
    })
    it('should edit the package', async () => {
        const oldPackageData = {
            status: 'entregado',
            receiver_name: 'Marcelo',
            address: 'calle 123',
            weight: 2,
            quantity: 4,
        }

        const mockPackage = await createPackage(oldPackageData)

        const newPackageDataForEdit = {
            status: 'No entregado',
            receiver_name: 'Adri',
            address: 'calle 555',
            weight: 3,
            quantity: 5,
        }
        const result = await editPackage(newPackageDataForEdit, mockPackage._id)

        expect(result).toMatchObject(newPackageDataForEdit)
    })

    it('you cant edit a package with empty properties', async () => {
        const oldPackageData = {
            status: 'No entregado',
            receiver_name: 'Adrian',
            address: 'street 123',
            weight: 1,
            quantity: 1,
        }

        const mockPackage = await createPackage(oldPackageData)

        const newPackageDataForEdit = {
            status: '',
            receiver_name: '',
            address: '',
            weight: null,
            quantity: undefined,
        }

        await expect(
            editPackage(newPackageDataForEdit, mockPackage._id)
        ).rejects.toThrow()
    })

    it('should manage error in editPackage', async () => {
        await expect(editPackage({}, {})).rejects.toThrow()
    })
})
