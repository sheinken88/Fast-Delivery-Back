import type { Response, Request } from 'express'
import { getAllAdmins, signupAdmin } from '../services/admin.services'
import { Admin } from '../models'
import setupTestDb, { teardownTestDb } from './test-db-setup'
import { login_admin } from '../controllers/admin.controller'

describe('GET ALL ADMINS', () => {
    beforeAll(async () => {
        await setupTestDb()
    })
    afterAll(async () => {
        await teardownTestDb()
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
})

describe('LOGIN ADMIN', () => {
    const mockAdmin = {
        username: 'admin username',
        email: 'adminemail@gmail.com',
        password: 'admin123',
        profile_pic: '',
    }

    beforeAll(async () => {
        await setupTestDb()
        await signupAdmin(mockAdmin)
    })

    afterAll(async () => {
        await teardownTestDb()
    })

    it('should log in an admin with valid credentials', async () => {
        const mockRequest = {
            body: {
                email: 'adminemail@gmail.com',
                password: 'admin123',
            },
        } as unknown as Request

        const mockResponse = {
            cookie: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as unknown as Response

        await login_admin(mockRequest, mockResponse)

        expect(mockResponse.cookie).toHaveBeenCalled()
        expect(mockResponse.status).toHaveBeenCalledWith(200)
        expect(mockResponse.send).toHaveBeenCalledWith(
            'Admin logged successfully'
        )
    })

    it('should handle incorrect credentials', async () => {
        const mockRequest = {
            body: {
                email: 'test@example.com',
                password: 'wrongpassword',
            },
        } as unknown as Request

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as unknown as Response

        await login_admin(mockRequest, mockResponse)

        expect(mockResponse.status).toHaveBeenCalledWith(500)
        expect(mockResponse.send).toHaveBeenCalledWith(
            'login_admin controller error'
        )
    })

    it('should handle admin not found', async () => {
        const mockRequest = {
            body: {
                email: 'nonexistent@example.com',
                password: 'password123',
            },
        } as unknown as Request

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as unknown as Response

        await login_admin(mockRequest, mockResponse)

        expect(mockResponse.status).toHaveBeenCalledWith(500)
        expect(mockResponse.send).toHaveBeenCalledWith(
            'login_admin controller error'
        )
    })
})

describe('CREATE ADMIN', () => {
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
