// import type { Response, Request } from 'express'
import { getAllAdmins } from '../../../services/admin.services'
import { Admin } from '../../../models'
import setupTestDb, { teardownTestDb } from '../../test-db-setup'
// import { login_admin } from '../../../controllers/admin.controller'

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

// describe('LOGIN ADMIN', () => {
//     const mockAdmin = {
//         username: 'admin username',
//         email: 'adminemail@gmail.com',
//         password: 'admin123',
//         profile_pic: '',
//         validatePassword: jest.fn().mockResolvedValue(true),
//     }

//     beforeAll(async () => {
//         await setupTestDb()
//         await signupAdmin(mockAdmin)
//     })

//     afterAll(async () => {
//         await teardownTestDb()
//     })

//     it('should log in an admin with valid credentials', async () => {
//         const mockRequest = {
//             body: {
//                 email: 'adminemail@gmail.com',
//                 password: 'admin123',
//             },
//         } as unknown as Request

//         const mockResponse = {
//             cookie: jest.fn(),
//             status: jest.fn().mockReturnThis(),
//             send: jest.fn(),
//         } as unknown as Response

//         await login_admin(mockRequest, mockResponse)

//         expect(mockResponse.cookie).toHaveBeenCalled()
//         expect(mockResponse.status).toHaveBeenCalledWith(200)
//         expect(mockResponse.send).toHaveBeenCalledWith(
//             'Admin logged successfully'
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

//         await login_admin(mockRequest, mockResponse)

//         expect(mockResponse.status).toHaveBeenCalledWith(500)
//         expect(mockResponse.send).toHaveBeenCalledWith(
//             'login_admin controller error'
//         )
//     })

//     it('should handle admin not found', async () => {
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

//         await login_admin(mockRequest, mockResponse)

//         expect(mockResponse.status).toHaveBeenCalledWith(500)
//         expect(mockResponse.send).toHaveBeenCalledWith(
//             'login_admin controller error'
//         )
//     })
// })
