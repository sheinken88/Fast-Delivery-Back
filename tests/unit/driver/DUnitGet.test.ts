import type IDriver from '../../../interfaces/driver.interface'
import { getAllDrivers } from '../../../services/driver.services'

jest.mock('../../../services/driver.services')

describe('GET ALL DRIVERS', () => {
    const mockDrivers = [
        {
            username: 'Pedro Juancho',
            email: 'pedrojuancho@gmail.com',
            password: 'pedro123',
            phone_number: '1134521643',
            status: false,
            profile_pic: '',
            packages: [],
        },
        {
            username: 'Juan Alonso',
            email: 'juanalonso@gmail.com',
            password: 'juan123',
            phone_number: '1123456789',
            status: true,
            profile_pic: '',
            packages: [],
        },
    ]
    it('should fetch all drivers', async () => {
        ;(getAllDrivers as jest.Mock).mockResolvedValueOnce(mockDrivers)

        const drivers = await getAllDrivers()

        expect(drivers).toEqual(mockDrivers)
        ;(getAllDrivers as jest.Mock).mockRestore()
    })

    it('should get an empty list', async () => {
        const mockDrivers: IDriver[] = []
        ;(getAllDrivers as jest.Mock).mockResolvedValueOnce(mockDrivers)
        const drivers = await getAllDrivers()
        expect(drivers).toEqual([])
    })

    it('Should handle errors', async () => {
        ;(getAllDrivers as jest.Mock).mockRejectedValueOnce(
            new Error('Error al obtener los drivers')
        )

        try {
            await getAllDrivers()
            fail('Expected getAllDrivers to throw an error')
        } catch (error) {
            expect(error).toBeDefined()
            error instanceof Error &&
                expect(error.message).toBe('Error al obtener los drivers')
        }

        ;(getAllDrivers as jest.Mock).mockRestore()
    })
})
