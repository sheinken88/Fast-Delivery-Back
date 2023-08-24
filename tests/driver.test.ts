import {
    getAllDrivers,
    signupDriver,
    loginDriver,
} from '../services/driver.services'
import { Driver } from '../models'
jest.mock('../models')

describe('GET /', () => {
    afterEach(() => {
        jest.restoreAllMocks()
    })
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

    describe('loginDriver', () => {
        it('should log in a driver successfully', async () => {
            const mockDriver = {
                username: 'pedro juancho',
                email: 'pedrojuancho@gmail.com',
                password: 'pedro123',
                status: true,
                packages: [],
                _id: '143abs3235234',
            }

            await signupDriver(mockDriver)

            const mockDriverData = {
                email: 'pedrojuancho@gmail.com',
                password: 'pedro123',
            }

            Driver.findOne = jest.fn().mockResolvedValue(mockDriverData)

            const result = await loginDriver({
                username: mockDriver.username,
                email: mockDriver.email,
            })

            expect(result).toBeDefined()
            expect(typeof result).toBe('string')
        })
    })

    describe('POST /', () => {
        it('should create a new driver', async () => {
            const newDriverData = {
                _id: '64dfbf606a8df32956ace2dc',
                email: 'nuevoconductor@gmail.com',
                password: 'nuevo123',
                phone_number: '1111111111',
                status: true,
                packages: [],
            }

            const mockDriver = new Driver(newDriverData)
            Driver.prototype.save = jest.fn().mockResolvedValue(mockDriver)
            const newDriver = await signupDriver(newDriverData)

            expect(newDriver._id).toEqual(mockDriver._id)
            expect(newDriver.username).toEqual(mockDriver.username)
            expect(newDriver.email).toEqual(mockDriver.email)
            expect(newDriver.password).toEqual(mockDriver.password)
            expect(newDriver.phone_number).toEqual(mockDriver.phone_number)
            expect(newDriver.status).toEqual(mockDriver.status)
            expect(newDriver.packages).toEqual(mockDriver.packages)

            expect(Driver.prototype.save).toHaveBeenCalledTimes(1)
        })

        it('should not create a new driver', async () => {
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
            await expect(signupDriver(newDriverData)).rejects.toThrowError(
                'Error al crear conductor'
            )
            expect(Driver.prototype.save).toHaveBeenCalledTimes(1)
        })

        it('should handle errors', async () => {
            const errorMessage = 'Error al crear conductor'
            Driver.prototype.save = jest
                .fn()
                .mockRejectedValue(new Error(errorMessage))
            await expect(signupDriver({})).rejects.toThrowError(errorMessage)
            expect(Driver.prototype.save).toHaveBeenCalledTimes(1)
        })
    })
})
