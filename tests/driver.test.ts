import { type Request, type Response } from 'express'
import { logout_driver } from '../controllers/driver.controller'
import type IDriver from '../interfaces/driver.interface'
import { Driver } from '../models'
import { getAllDrivers, signupDriver } from '../services/driver.services'

describe('GET ALL DRIVERS', () => {
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

//     it('should log in a driver successfully', async () => {
//         try {
//             const mockDriverData = {
//                 email: mockDriver.email,
//                 password: mockDriver.password,
//             }

//             Driver.findOne = jest.fn().mockResolvedValue(mockDriverData)

//             const result = await loginDriver({
//                 username: mockDriver.username,
//                 email: mockDriver.email,
//             })

//             expect(result).toBeDefined()
//             expect(typeof result).toBe('string')
//         } catch (error) {
//             console.error('Test failed with error:', error)
//             throw error
//         }
//     })

//     it('should not log in with incorrect credentials', async () => {
//         const response = await agent(app).post('/login').send({
//             email: 'incorrectmail@gmail.com',
//             password: 'incorrectpassword',
//         })

//         expect(response.status).toBe(401)
//         expect(response.text).toContain('Incorrect data')
//     })
// })

describe('CREATE DRIVER', () => {
    it('should signup a driver correctly', async () => {
        const mockDriverData = {
            username: 'new driver',
            email: 'newdriver@gmail.com',
            password: 'newDriver123',
            phone_number: '1123543223',
            status: true,
            profile_pic: '',
            packages: [],
        }

        Driver.prototype.save = jest.fn().mockResolvedValue(mockDriverData)

        const newDriver = await signupDriver(mockDriverData)
        console.log('newDriver', newDriver)

        expect(newDriver).toHaveProperty('_id')
        expect(Driver.prototype.save).toHaveBeenCalledTimes(1)
        expect(newDriver.username).toEqual(mockDriverData.username)
        expect(newDriver.email).toEqual(mockDriverData.email)
        expect(newDriver.phone_number).toEqual(mockDriverData.phone_number)
        expect(newDriver.status).toEqual(mockDriverData.status)
        expect(newDriver.profile_pic).toEqual(mockDriverData.profile_pic)
        expect(newDriver.packages).toEqual(mockDriverData.packages)
    })

    it('should handle errors correctly', async () => {
        const mockDriverData = {
            username: 'new driver',
            email: 'newdriver@gmail.com',
            password: 'newDriver123',
            status: true,
            package: [],
        }
        const mockError = new Error('Something went wrong!')

        Driver.prototype.save = jest.fn().mockRejectedValue(mockError)

        await expect(signupDriver(mockDriverData)).rejects.toThrow(mockError)
        expect(Driver.prototype.save).toHaveBeenCalledTimes(1)
    })
})

describe('LOGOUT DRIVER', () => {
    it('should be able to delete the drivers cookie', () => {
        const clearCookieMock = jest.fn()
        const sendStatusMock = jest.fn()

        const mockRequest = {} as Request
        const mockResponse: Response = {
            clearCookie: clearCookieMock,
            sendStatus: sendStatusMock,
            status: jest.fn(() => mockResponse),
        } as unknown as Response

        logout_driver(mockRequest, mockResponse)

        expect(clearCookieMock).toHaveBeenCalledWith('token')
        expect(sendStatusMock).toHaveBeenCalledWith(200)
    })
})
