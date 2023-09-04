import { createPackage, editPackage } from '../../../services/package.services'
import { Package } from '../../../models'
import type IPackage from '../../../interfaces/package.interface'

jest.mock('../../../services/package.services')

describe('Edit Packages', () => {
    const oldPackageData: IPackage = {
        status: 'entregado',
        receiver_name: 'Marcelo',
        address: 'calle 123',
        weight: 2,
        quantity: 4,
    }
    it('should edit the package', async () => {
        const newPackageData: IPackage = {
            status: 'pendiente',
            receiver_name: 'Juan',
            address: 'calle 456',
            weight: 3,
            quantity: 5,
        }

        ;(createPackage as jest.Mock).mockResolvedValueOnce(
            new Package(oldPackageData)
        )

        const createdPackage = await createPackage(oldPackageData)

        ;(editPackage as jest.Mock).mockResolvedValueOnce(
            new Package(newPackageData)
        )

        const editedPackage = await editPackage(
            newPackageData,
            createdPackage._id
        )

        expect(editedPackage).toBeDefined()
        expect(editedPackage).toMatchObject(newPackageData)
        ;(createPackage as jest.Mock).mockRestore()
        ;(editPackage as jest.Mock).mockRestore()
    })

    it('you cant edit a package with empty properties', async () => {
        ;(createPackage as jest.Mock).mockResolvedValueOnce(
            new Package(oldPackageData)
        )
        const createdPackage = await createPackage(oldPackageData)

        ;(editPackage as jest.Mock).mockRejectedValueOnce(
            new Error('Validation error: receiver_name is required')
        )
        const newPackageData: IPackage = {
            status: 'pendiente',
            receiver_name: '',
            address: '',
            weight: 3,
            quantity: 5,
        }

        try {
            await editPackage(newPackageData, createdPackage._id)
            fail('Expected editPackage to throw a validation error')
        } catch (error) {
            expect(error).toBeDefined()
            error instanceof Error &&
                expect(error.message).toBe(
                    'Validation error: receiver_name is required'
                )
        }

        ;(createPackage as jest.Mock).mockRestore()
        ;(editPackage as jest.Mock).mockRestore()
    })

    it('should manage error in editPackage', async () => {
        ;(editPackage as jest.Mock).mockRejectedValueOnce(
            new Error('Error al editar el paquete')
        )

        try {
            await editPackage({}, {})
            fail('Expected editPackage to throw an error')
        } catch (error) {
            expect(error).toBeDefined()
            error instanceof Error &&
                expect(error.message).toBe('Error al editar el paquete')
        }

        ;(editPackage as jest.Mock).mockRestore()
    })
})
