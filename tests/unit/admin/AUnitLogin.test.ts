import { loginAdmin } from '../../../services/admin.services'
import { generateToken } from '../../../config/token/index'

jest.mock('../../../services/admin.services')

describe('LOGIN ADMIN', () => {
    const mockAdmin = {
        username: 'admin username',
        email: 'adminemail@gmail.com',
        password: 'admin123',
        profile_pic: '',
    }
    const { username, email } = mockAdmin

    it('should log in an admin with valid credentials', async () => {
        const validToken = generateToken({ username, email })

        ;(loginAdmin as jest.Mock).mockResolvedValueOnce(validToken)

        const authData = await loginAdmin({ username, email })

        expect(authData).toEqual(validToken)
        ;(loginAdmin as jest.Mock).mockRestore()
    })

    it('should handle incorrect credentials', async () => {
        ;(loginAdmin as jest.Mock).mockResolvedValueOnce(null)

        const authData = await loginAdmin({
            username: 'adm',
            email: 'admin@gmail.com',
        })

        expect(authData).toBeNull()
        ;(loginAdmin as jest.Mock).mockRestore()
    })

    it('should handle errors', async () => {
        ;(loginAdmin as jest.Mock).mockRejectedValueOnce(
            new Error('Error al buscar el admin')
        )

        try {
            await loginAdmin({ username, email })
            fail('Expected loginAdmin to throw an error')
        } catch (error) {
            expect(error).toBeDefined()
            error instanceof Error &&
                expect(error.message).toBe('Error al buscar el admin')
        }

        ;(loginAdmin as jest.Mock).mockRestore()
    })
})
