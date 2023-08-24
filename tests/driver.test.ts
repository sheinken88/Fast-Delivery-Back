import { getAllDrivers, signupDriver } from '../services/driver.services'
import { Driver } from '../models'
// import { login_driver } from '../controllers/driver.controller'
// import { Request, Response } from 'express'

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

    // it('should log in a driver', async () => {
    //     const mockDriver = {
    //         username: 'Pedro Juancho',
    //         email: 'pedrojuancho@gmail.com',
    //         password: 'pedro123',
    //         phone_number: '1134521643',
    //         status: false,
    //     }
    //     await signupDriver(mockDriver)

    //     const mockDriverData = {
    //         email: 'pedrojuancho@gmail.com',
    //         password: 'pedro123',
    //     }

    //     const mockDriverModel = {
    //         findOne: jest.fn((query) => {
    //             if (query.email === mockDriver.email) {
    //                 return Promise.resolve(mockDriver)
    //             } else {
    //                 return Promise.resolve(null)
    //             }
    //         }),
    //     }
    //     jest.mock('../models', () => ({
    //         Driver: mockDriverModel,
    //     }))

    //     const mockRequest = {
    //         body: mockDriverData,
    //     } as Request

    //     const mockResponse = {
    //         status: jest.fn().mockReturnThis(),
    //         json: jest.fn(),
    //         sendStatus: jest.fn(),
    //     } as unknown as Response

    //     await login_driver(mockRequest, mockResponse)

    //     expect(mockDriverModel.findOne).toHaveBeenCalledWith({
    //         email: mockDriverData.email,
    //     })
    //     expect(mockResponse.status).toHaveBeenCalledWith(200)
    //     expect(mockResponse.json).toHaveBeenCalledWith(expect.any(String))
    // })

    describe('POST /', () => {
        it('should create a new driver', async () => {
            const newDriverData = {
                _id: '64dfbf606a8df32956ace2dc',
                email: 'nuevoconductor@gmail.com',
                password: 'nuevo123',
                phone_number: '1111111111',
                status: true,
            }

            const mockDriver = new Driver(newDriverData)
            Driver.prototype.save = jest.fn().mockResolvedValue(mockDriver)
            const newDriver = await signupDriver(newDriverData)
            expect(newDriver).toEqual(mockDriver)
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
