import { getAllDrivers, createDriver } from '../services/driver.services'
import { Driver } from '../models'

describe('Drivers', () => {
    it('should fetch all drivers', async () => {
        const mockDrivers = [
            {
                username: 'Pedro Juancho',
                email: 'pedrojuancho@gmail.com',
                password: 'pedro123',
                phone_number: '1134521643',
                status: false,
            },
            {
                username: 'Juan Alonso',
                email: 'juanalonso@gmail.com',
                password: 'juan123',
                phone_number: '1123456789',
                status: true,
            },
        ]

        Driver.find = jest.fn().mockResolvedValue(mockDrivers)

        const drivers = await getAllDrivers()

        expect(drivers).toEqual(mockDrivers)
        expect(Driver.find).toHaveBeenCalledTimes(1)
    })

    it('debería manejar errores', async () => {
        const errorMessage = 'Error al obtener conductores'
        Driver.find = jest.fn().mockRejectedValue(new Error(errorMessage))
        await expect(getAllDrivers()).rejects.toThrowError(errorMessage)
        expect(Driver.find).toHaveBeenCalledTimes(1)
    })

    it('debería crear un nuevo conductor', async () => {
        const newDriverData = {
            _id: '64dfbf606a8df32956ace2dc',
            email: 'nuevoconductor@gmail.com',
            password: 'nuevo123',
            phone_number: '1111111111',
            status: true,
        }

        const mockDriver = new Driver(newDriverData)
        console.log('mockDriver', mockDriver)
        Driver.prototype.save = jest.fn().mockResolvedValue(mockDriver)
        const newDriver = await createDriver(newDriverData)
        console.log('newDriver', newDriver)
        expect(newDriver).toEqual(mockDriver)
        expect(Driver.prototype.save).toHaveBeenCalledTimes(1)
    })

    it('no debería crear un nuevo conductor', async () => {
        const newDriverData = {
            _id: '64dfbf606a8df32956ace2dc',
            username: 'Nombre del Conductor',
            email: 'conductor@example.com',
            phone_number: '1111111111',
            status: true,
        }
        Driver.prototype.save = jest
            .fn()
            .mockRejectedValue(new Error('Error al crear conductor'))
        await expect(createDriver(newDriverData)).rejects.toThrowError(
            'Error al crear conductor'
        )
        expect(Driver.prototype.save).toHaveBeenCalledTimes(1)
    })

    it('debería manejar errores', async () => {
        const errorMessage = 'Error al crear conductor'
        Driver.prototype.save = jest
            .fn()
            .mockRejectedValue(new Error(errorMessage))
        await expect(createDriver({})).rejects.toThrowError(errorMessage)
        expect(Driver.prototype.save).toHaveBeenCalledTimes(1)
    })
})
