import {
    getAllDrivers,
    signupDriver,
    loginDriver,
} from '../services/driver.services'
// import { logout_driver } from '../controllers/driver.controller'
// import { Request, Response } from 'express'
import { Driver } from '../models'
import type IDriver from '../interfaces/driver.interface'
import { app } from '../app'
import { agent } from 'supertest'
jest.mock('../models')

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

describe('LOGIN DRIVER', () => {
    const mockDriver = {
        username: 'pedro juancho',
        email: 'pedrojuancho@gmail.com',
        password: 'pedro123',
        status: true,
        packages: [],
        _id: '143abs3235234',
    }
    beforeAll(async () => {
        await signupDriver(mockDriver)
    })
    it('should log in a driver successfully', async () => {
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

    it('should not log in with incorrect credentials', async () => {
        const response = await agent(app).post('/login').send({
            email: 'incorrectmail@gmail.com',
            password: 'incorrectpassword',
        })

        expect(response.status).toBe(401)
        expect(response.text).toContain('Incorrect data')
    })
})

describe('CREATE DRIVER', () => {
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

describe('LOGOUT DRIVER', () => {
    it('should be able to delete the drivers cookie', async () => {
        const clearCookieMock = jest.fn()
        const sendStatusMock = jest.fn()

        // const mockResponse: Partial<Response> = {
        //     clearCookie: clearCookieMock,
        //     sendStatus: sendStatusMock,
        // }

        // logout_driver(mockResponse as Response)

        expect(clearCookieMock).toHaveBeenCalledWith('token')
        expect(sendStatusMock).toHaveBeenCalledWith(200)
    })
})
