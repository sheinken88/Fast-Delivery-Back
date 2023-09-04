import { getAllPackages } from '../../../services/package.services'

jest.mock('../../../services/package.services')

describe('Fetch Packages', () => {
    it('should fetch all Packages', async () => {
        const mockPackages = [
            {
                status: 'En curso',
                receiver_name: 'José Carlos',
                address: 'Jose Carlos 123',
                weight: 15.2,
                quantity: 4,
            },
            {
                status: 'No entregado',
                receiver_name: 'Carlos',
                address: 'street 123',
                weight: 3,
                quantity: 1,
            },
        ]

        ;(getAllPackages as jest.Mock).mockResolvedValueOnce(mockPackages)

        const packages = await getAllPackages()

        expect(packages).toEqual(mockPackages)
        ;(getAllPackages as jest.Mock).mockRestore()
    })

    it('should manage error in getAllPackages', async () => {
        ;(getAllPackages as jest.Mock).mockRejectedValueOnce(
            new Error('Error al obtener los paquetes')
        )

        try {
            await getAllPackages()
            fail('Expected getAllPackages to throw an error')
        } catch (error) {
            expect(error).toBeDefined()
            error instanceof Error &&
                expect(error.message).toBe('Error al obtener los paquetes')
        }

        ;(getAllPackages as jest.Mock).mockRestore()
    })
})
