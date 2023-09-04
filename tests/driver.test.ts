// import { type Request, type Response } from 'express'
// import { login_driver, logout_driver } from '../controllers/driver.controller'
// import type IDriver from '../interfaces/driver.interface'
// import { Driver } from '../models'
// import { getAllDrivers, signupDriver } from '../services/driver.services'
// import setupTestDb, { teardownTestDb } from './test-db-setup'

// describe('GET ALL DRIVERS', () => {
//     beforeAll(async () => {
//         await setupTestDb()
//     })

//     afterAll(async () => {
//         await teardownTestDb()
//     })
//     it('should fetch all drivers', async () => {
//         const mockDrivers = [
//             {
//                 username: 'Pedro Juancho',
//                 email: 'pedrojuancho@gmail.com',
//                 password: 'pedro123',
//                 phone_number: '1134521643',
//                 status: false,
//                 profile_pic: '',
//                 packages: [],
//             },
//             {
//                 username: 'Juan Alonso',
//                 email: 'juanalonso@gmail.com',
//                 password: 'juan123',
//                 phone_number: '1123456789',
//                 status: true,
//                 profile_pic: '',
//                 packages: [],
//             },
//         ]

//         Driver.find = jest.fn().mockResolvedValue(mockDrivers)

//         const drivers = await getAllDrivers()

//         expect(drivers).toEqual(mockDrivers)
//         expect(Driver.find).toHaveBeenCalledTimes(1)
//     })

//     it('should get an empty list', async () => {
//         const mockDrivers: IDriver[] = []
//         Driver.find = jest.fn().mockResolvedValue(mockDrivers)

//         const drivers = await getAllDrivers()
//         expect(drivers).toEqual(mockDrivers)
//         expect(Driver.find).toHaveBeenCalledTimes(1)
//     })

//     it('should handle errors on getter', async () => {
//         const errorMessage = 'Error al obtener conductores'
//         Driver.find = jest.fn().mockRejectedValue(new Error(errorMessage))
//         await expect(getAllDrivers()).rejects.toThrowError(errorMessage)
//         expect(Driver.find).toHaveBeenCalledTimes(1)
//     })
// })

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

// describe('CREATE DRIVER', () => {
//     beforeAll(async () => {
//         await setupTestDb()
//     })

//     afterAll(async () => {
//         await teardownTestDb()
//     })
//     it('should signup a driver correctly', async () => {
//         const mockDriverData = {
//             username: 'new driver',
//             email: 'newdriver@gmail.com',
//             password: 'newDriver123',
//             phone_number: '1123543223',
//             status: true,
//             profile_pic: '',
//             packages: [],
//         }

//         Driver.prototype.save = jest.fn().mockResolvedValue(mockDriverData)

//         const newDriver = await signupDriver(mockDriverData)

//         expect(newDriver).toHaveProperty('_id')
//         expect(Driver.prototype.save).toHaveBeenCalledTimes(1)
//         expect(newDriver.username).toEqual(mockDriverData.username)
//         expect(newDriver.email).toEqual(mockDriverData.email)
//         expect(newDriver.phone_number).toEqual(mockDriverData.phone_number)
//         expect(newDriver.status).toEqual(mockDriverData.status)
//         expect(newDriver.profile_pic).toEqual(mockDriverData.profile_pic)
//         expect(newDriver.packages).toEqual(mockDriverData.packages)
//     })

//     it('should handle errors correctly', async () => {
//         const mockDriverData = {
//             username: 'new driver',
//             email: 'newdriver@gmail.com',
//             password: 'newDriver123',
//             status: true,
//             package: [],
//         }
//         const mockError = new Error('Something went wrong!')

//         Driver.prototype.save = jest.fn().mockRejectedValue(mockError)

//         await expect(signupDriver(mockDriverData)).rejects.toThrow(mockError)
//         expect(Driver.prototype.save).toHaveBeenCalledTimes(1)
//     })
// })

// describe('LOGOUT DRIVER', () => {
//     it('should be able to delete the drivers cookie', () => {
//         const clearCookieMock = jest.fn()
//         const sendStatusMock = jest.fn()

//         const mockRequest = {} as Request
//         const mockResponse: Response = {
//             clearCookie: clearCookieMock,
//             sendStatus: sendStatusMock,
//             status: jest.fn(() => mockResponse),
//         } as unknown as Response

//         logout_driver(mockRequest, mockResponse)

//         expect(clearCookieMock).toHaveBeenCalledWith('token')
//         expect(sendStatusMock).toHaveBeenCalledWith(200)
//     })
// })
