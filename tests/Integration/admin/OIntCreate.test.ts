import { signupAdmin } from '../../../services/admin.services'
import { Admin } from '../../../models'
import setupTestDb, { teardownTestDb } from '../../test-db-setup'

describe('CREATE ADMIN', () => {
    beforeAll(async () => {
        await setupTestDb()
    })
    afterAll(async () => {
        await teardownTestDb()
    })
    const newAdminData = {
        _id: '64e90b3f618bfb85aa1ab87a',
        username: 'new admin',
        email: 'newAdmin@gmail.com',
        password: 'new123',
        profile_pic: '/pathto.jpg',
        validatePassword: jest.fn().mockResolvedValue(true),
    }
    it('should create a new admin', async () => {
        const mockAdmin = new Admin(newAdminData)
        Admin.prototype.save = jest.fn().mockResolvedValue(mockAdmin)
        const newAdmin = await signupAdmin(newAdminData)
        expect(newAdmin).toEqual(mockAdmin)
        expect(Admin.prototype.save).toHaveBeenCalledTimes(1)
    })

    it('should not create a new admin', async () => {
        Admin.prototype.save = jest
            .fn()
            .mockRejectedValue(new Error('Error when creating admin'))
        await expect(signupAdmin(newAdminData)).rejects.toThrowError(
            'Error when creating admin'
        )
        expect(Admin.prototype.save).toHaveBeenCalledTimes(1)
    })

    // it('should handle errors', async () => {
    // const errorMessage = 'Error when creating admin'
    // Admin.prototype.save = jest
    //     .fn()
    //     .mockRejectedValue(new Error(errorMessage))
    // await expect(signupAdmin()).rejects.toThrowError(errorMessage)
    // expect(Admin.prototype.save).toHaveBeenCalledTimes(1)
    // })
})
