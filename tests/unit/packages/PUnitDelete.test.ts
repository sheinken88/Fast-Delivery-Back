import {
    createPackage,
    deletePackage,
} from '../../../services/package.services'
import { Package } from '../../../models'
import type IPackage from '../../../interfaces/package.interface'

jest.mock('../../../services/package.services')

describe('Delete Packages', () => {
    it('should delete the package', async () => {
        const newPackageData: IPackage = {
            status: 'entregado',
            receiver_name: 'Marcelo',
            address: 'Tu direc favorita',
            weight: 2,
            quantity: 4,
        }

        ;(createPackage as jest.Mock).mockResolvedValueOnce(
            new Package(newPackageData)
        )

        const createdPackage = await createPackage(newPackageData)

        ;(deletePackage as jest.Mock).mockResolvedValueOnce(true)

        const isDeleted = await deletePackage(createdPackage._id.toString())

        expect(isDeleted).toBe(true)
        ;(createPackage as jest.Mock).mockRestore()
        ;(deletePackage as jest.Mock).mockRestore()
    })

    it('should manage error in deletePackage', async () => {
        ;(deletePackage as jest.Mock).mockRejectedValueOnce(
            new Error('Error al eliminar el paquete')
        )

        try {
            await deletePackage('64e64f24dde4dcf8d40d20a5')
            fail('Expected deletePackage to throw an error')
        } catch (error) {
            expect(error).toBeDefined()
            error instanceof Error &&
                expect(error.message).toBe('Error al eliminar el paquete')
        }

        ;(deletePackage as jest.Mock).mockRestore()
    })
})
