// import { type Request, type Response } from 'express'
// import { login_driver } from '../../../controllers/driver.controller'
import setupTestDb, { teardownTestDb } from '../../test-db-setup'
import type IDriver from '../../../interfaces/driver.interface'
import { Driver } from '../../../models'
import { getAllDrivers } from '../../../services/driver.services'

describe('GET ALL DRIVERS', () => {
    beforeAll(async () => {
        await setupTestDb()
    })

    afterAll(async () => {
        await teardownTestDb()
    })
    it('should fetch all drivers', async () => {
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

        Driver.find = jest.fn().mockResolvedValue(mockDrivers)

        const drivers = await getAllDrivers()

        expect(drivers).toEqual(mockDrivers)
        expect(Driver.find).toHaveBeenCalledTimes(1)
    })

    it('should get an empty list', async () => {
        const mockDrivers: IDriver[] = []
        Driver.find = jest.fn().mockResolvedValue(mockDrivers)

        const drivers = await getAllDrivers()
        expect(drivers).toEqual(mockDrivers)
        expect(Driver.find).toHaveBeenCalledTimes(1)
    })

    it('should handle errors on getter', async () => {
        const errorMessage = 'Error al obtener conductores'
        Driver.find = jest.fn().mockRejectedValue(new Error(errorMessage))
        await expect(getAllDrivers()).rejects.toThrowError(errorMessage)
        expect(Driver.find).toHaveBeenCalledTimes(1)
    })
})

// describe('LOGIN DRIVER', () => {
//     beforeAll(async () => {
//         await setupTestDb()
//     })

//     afterAll(async () => {
//         await teardownTestDb()
//     })
//     const mockDriver = {
//         username: 'new driver',
//         email: 'newdriver@gmail.com',
//         password: 'newDriver123',
//         phone_number: '1123543223',
//         status: true,
//         profile_pic: '',
//         packages: [],
//     }

//     beforeAll(async () => {
//         await signupDriver(mockDriver)
//     })

//     it('should log in a driver with valid credentials', async () => {
//         const mockRequest = {
//             body: {
//                 email: 'newdriver@gmail.com',
//                 password: 'newDriver123',
//             },
//         } as unknown as Request

//         const mockResponse = {
//             cookie: jest.fn(),
//             status: jest.fn().mockReturnThis(),
//             send: jest.fn(),
//         } as unknown as Response

//         await login_driver(mockRequest, mockResponse)

//         expect(mockResponse.cookie).toHaveBeenCalled()
//         expect(mockResponse.status).toHaveBeenCalledWith(200)
//         expect(mockResponse.send).toHaveBeenCalledWith(
//             'driver logged correctly'
//         )
//     })

//     it('should handle incorrect credentials', async () => {
//         const mockRequest = {
//             body: {
//                 email: 'test@example.com',
//                 password: 'wrongpassword',
//             },
//         } as unknown as Request

//         const mockResponse = {
//             status: jest.fn().mockReturnThis(),
//             send: jest.fn(),
//         } as unknown as Response

//         await login_driver(mockRequest, mockResponse)

//         expect(mockResponse.status).toHaveBeenCalledWith(500)
//         expect(mockResponse.send).toHaveBeenCalledWith(
//             'login_driver controller error'
//         )
//     })
//     it('should handle driver not found', async () => {
//         const mockRequest = {
//             body: {
//                 email: 'nonexistent@example.com',
//                 password: 'password123',
//             },
//         } as unknown as Request

//         const mockResponse = {
//             status: jest.fn().mockReturnThis(),
//             send: jest.fn(),
//         } as unknown as Response

//         await login_driver(mockRequest, mockResponse)

//         expect(mockResponse.status).toHaveBeenCalledWith(500)
//         expect(mockResponse.send).toHaveBeenCalledWith(
//             'login_driver controller error'
//         )
//     })
// })
