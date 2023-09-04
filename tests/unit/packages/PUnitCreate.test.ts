import { createPackage } from '../../../services/package.services'
import { Package } from '../../../models'
import type IPackage from '../../../interfaces/package.interface'

jest.mock('../../../services/package.services')

describe('Create Packages', () => {
    it('should create a new package', async () => {
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

        expect(createdPackage).toBeDefined()
        expect(createdPackage.status).toBe(newPackageData.status)
        ;(createPackage as jest.Mock).mockRestore()
    })

    it('should manage error in createPackage', async () => {
        const newPackageData: IPackage = {
            status: 'entregado',
            receiver_name: 'Marcelo',
            address: 'Tu direc favorita',
            weight: 2,
            quantity: 4,
        }

        ;(createPackage as jest.Mock).mockRejectedValueOnce(
            new Error('Error al crear el paquete')
        )

        try {
            await createPackage(newPackageData)
            fail('Expected createPackage to throw an error')
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
            error instanceof Error &&
                expect(error.message).toBe('Error al crear el paquete')
        }

        ;(createPackage as jest.Mock).mockRestore()
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

        ;(createPackage as jest.Mock).mockRejectedValueOnce(
            new Error('Validation error: receiver_name is required')
        )

        try {
            await createPackage(newPackageData)
            fail('Expected createPackage to throw a validation error')
        } catch (error) {
            expect(error).toBeDefined()
            error instanceof Error &&
                expect(error.message).toBe(
                    'Validation error: receiver_name is required'
                )
        }

        ;(createPackage as jest.Mock).mockRestore()
    })
})
