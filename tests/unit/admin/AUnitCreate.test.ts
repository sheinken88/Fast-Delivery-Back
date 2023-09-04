import { signupAdmin } from '../../../services/admin.services'
import { Admin } from '../../../models'

jest.mock('../../../services/admin.services')

describe('CREATE ADMIN', () => {
    const newAdminData = {
        _id: '64e90b3f618bfb85aa1ab87a',
        email: 'newAdmin@gmail.com',
        username: 'new admin',
        password: 'new123',
        profile_pic: '/pathto.jpg',
        validatePassword: jest.fn().mockResolvedValue(true),
    }

    it('should create a new admin', async () => {
        ;(signupAdmin as jest.Mock).mockResolvedValueOnce(
            new Admin(newAdminData)
        )

        const newAdmin = await signupAdmin(newAdminData)

        expect(newAdmin).toBeDefined()
        expect(newAdmin.email).toBe(newAdminData.email)
        ;(signupAdmin as jest.Mock).mockRestore()
    })

    it('shouldnt create a new admin that already exists', async () => {
        ;(signupAdmin as jest.Mock).mockRejectedValueOnce(
            new Error('Admin with email already exists')
        )

        try {
            await signupAdmin(newAdminData)
            fail('Expected createUser to throw an error for existing user')
        } catch (error) {
            expect(error).toBeDefined()
            error instanceof Error &&
                expect(error.message).toBe('Admin with email already exists')
        }

        ;(signupAdmin as jest.Mock).mockRestore()
    })

    it('signupAdmin should handle errors', async () => {
        ;(signupAdmin as jest.Mock).mockRejectedValueOnce(
            new Error('Error al crear el admin')
        )

        try {
            await signupAdmin(newAdminData)
            fail('Expected signupAdmin to throw an error')
        } catch (error) {
            expect(error).toBeDefined()
            error instanceof Error &&
                expect(error.message).toBe('Error al crear el admin')
        }

        ;(signupAdmin as jest.Mock).mockRestore()
    })
})
