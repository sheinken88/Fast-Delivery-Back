import type { Response } from 'express'
import { login_admin } from '../controllers/admin.controller'
import { getAllAdmins, signupAdmin } from '../services/admin.services'
import { Admin } from '../models'
import setupTestDb, { teardownTestDb } from './test-db-setup'

describe('GET /', () => {
    beforeAll(async () => {
        await setupTestDb()
    })
    afterAll(async () => {
        await teardownTestDb()
    })
    afterEach(() => {
        jest.restoreAllMocks()
    })
    it('should fetch all admins', async () => {
        const mockAdmins = [
            {
                username: 'Pedro Juancho',
                email: 'pedrojuancho@gmail.com',
                password: 'pedro123',
                profile_pic: '/pathto.jpg',
            },
            {
                username: 'Juan Alonso',
                email: 'juanalonso@gmail.com',
                password: 'juan123',
                profile_pic: '/pathto.jpg',
            },
        ]

        Admin.find = jest.fn().mockResolvedValue(mockAdmins)

        const admins = await getAllAdmins()

        expect(admins).toEqual(mockAdmins)
        expect(Admin.find).toHaveBeenCalledTimes(1)
    })

    it('Should handle errors', async () => {
        const errorMessage = 'Error getting admins'
        Admin.find = jest.fn().mockRejectedValue(new Error(errorMessage))
        await expect(getAllAdmins()).rejects.toThrowError(errorMessage)
        expect(Admin.find).toHaveBeenCalledTimes(1)
    })
    it('should log in an admin', async () => {
        const mockAdmin = {
            username: 'Juan Alonso',
            email: 'juanalonso@gmail.com',
            password: 'juan123',
            profile_pic: '/pathto.jpg',
        }
        await signupAdmin(mockAdmin)

        const mockAdminData = {
            email: 'juanalonso@gmail.com',
            password: 'juan123',
        }

        const mockAdmiModel = {
            findOne: jest.fn(async (query) => {
                if (query.email === mockAdmin.email) {
                    // eslint-disable-next-line
                    return Promise.resolve(mockAdmin)
                } else {
                    // eslint-disable-next-line
                    return Promise.resolve(null)
                }
            }),
        }
        jest.mock('../models', () => ({
            Admin: mockAdmiModel,
        }))
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const mockRequest = {
            body: mockAdminData,
        } as any
        /* eslint-enable @typescript-eslint/no-explicit-any */

        const mockResponse: Response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            sendStatus: jest.fn(),
        } as unknown as Response

        await login_admin(mockRequest, mockResponse)

        expect(mockAdmiModel.findOne).toHaveBeenCalledWith({
            email: mockAdminData.email,
        })
        expect(mockResponse.status).toHaveBeenCalledWith(200)
        expect(mockResponse.json).toHaveBeenCalledWith(expect.any(String))
    })
})

describe('POST /', () => {
    beforeAll(async () => {
        await setupTestDb()
    })
    afterAll(async () => {
        await teardownTestDb()
    })
    it('should create a new admin', async () => {
        const newAdminData = {
            _id: '64e90b3f618bfb85aa1ab87a',
            email: 'newAdmin@gmail.com',
            password: 'new123',
            profile_pic: '/pathto.jpg',
        }

        const mockAdmin = new Admin(newAdminData)
        Admin.prototype.save = jest.fn().mockResolvedValue(mockAdmin)
        const newAdmin = await signupAdmin(newAdminData)
        expect(newAdmin).toEqual(mockAdmin)
        expect(Admin.prototype.save).toHaveBeenCalledTimes(1)
    })

    it('should not create a new admin', async () => {
        const newAdminData = {
            _id: '64e90b3f618bfb85aa1ab87a',
            email: 'newAdmin@gmail.com',
            password: 'new123',
            profile_pic: '/pathto.jpg',
        }
        Admin.prototype.save = jest
            .fn()
            .mockRejectedValue(new Error('Error when creating admin'))
        await expect(signupAdmin(newAdminData)).rejects.toThrowError(
            'Error when creating admin'
        )
        expect(Admin.prototype.save).toHaveBeenCalledTimes(1)
    })

    it('should handle errors', async () => {
        const errorMessage = 'Error when creating admin'
        Admin.prototype.save = jest
            .fn()
            .mockRejectedValue(new Error(errorMessage))
        await expect(signupAdmin({})).rejects.toThrowError(errorMessage)
        expect(Admin.prototype.save).toHaveBeenCalledTimes(1)
    })
})
