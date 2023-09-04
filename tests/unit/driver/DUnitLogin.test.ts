import { generateToken } from '../../../config/token'
import { loginDriver } from '../../../services/driver.services'

jest.mock('../../../services/driver.services')

describe('LOGIN DRIVER', () => {
    const mockDriverData = {
        username: 'new driver',
        email: 'newdriver@gmail.com',
        password: 'newDriver123',
        phone_number: '1123543223',
        status: true,
        profile_pic: '',
        packages: [],
    }
    const { username, email } = mockDriverData

    it('should log in an admin with valid credentials', async () => {
        const validToken = generateToken({ username, email })

        ;(loginDriver as jest.Mock).mockResolvedValueOnce(validToken)

        const authData = await loginDriver({ username, email })

        expect(authData).toEqual(validToken)
        ;(loginDriver as jest.Mock).mockRestore()
    })

    it('should handle incorrect credentials', async () => {
        ;(loginDriver as jest.Mock).mockResolvedValueOnce(null)

        const authData = await loginDriver({
            username: 'driver',
            email: 'driver@gmail.com',
        })

        expect(authData).toBeNull()
        ;(loginDriver as jest.Mock).mockRestore()
    })

    it('should handle errors', async () => {
        ;(loginDriver as jest.Mock).mockRejectedValueOnce(
            new Error('Error al buscar el driver')
        )

        try {
            await loginDriver({ username, email })
            fail('Expected loginDriver to throw an error')
        } catch (error) {
            expect(error).toBeDefined()
            error instanceof Error &&
                expect(error.message).toBe('Error al buscar el driver')
        }

        ;(loginDriver as jest.Mock).mockRestore()
    })
})
