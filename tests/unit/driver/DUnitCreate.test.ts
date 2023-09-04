import { Driver } from '../../../models'
import { signupDriver } from '../../../services/driver.services'

jest.mock('../../../services/driver.services')

describe('CREATE DRIVER', () => {
    const mockDriverData = {
        username: 'new driver',
        email: 'newdriver@gmail.com',
        password: 'newDriver123',
        phone_number: '1123543223',
        status: true,
        profile_pic: '',
        packages: [],
    }

    it('should signup a driver correctly', async () => {
        ;(signupDriver as jest.Mock).mockResolvedValueOnce(
            new Driver(mockDriverData)
        )

        const createdPackage = await signupDriver(mockDriverData)

        expect(createdPackage).toBeDefined()
        expect(createdPackage.status).toBe(mockDriverData.status)
        ;(signupDriver as jest.Mock).mockRestore()
    })

    it('should handle errors correctly', async () => {
        ;(signupDriver as jest.Mock).mockRejectedValueOnce(
            new Error('Error al crear el driver')
        )

        try {
            await signupDriver(mockDriverData)
            fail('Expected signupDriver to throw an error')
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
            error instanceof Error &&
                expect(error.message).toBe('Error al crear el driver')
        }

        ;(signupDriver as jest.Mock).mockRestore()
    })

    it('you cant create a driver with empty properties', async () => {
        const newPackageData = {
            username: '',
            email: '',
            password: '',
            phone_number: '1123543223',
            status: true,
            profile_pic: '',
        }

        ;(signupDriver as jest.Mock).mockRejectedValueOnce(
            new Error('Validation error: username is required')
        )

        try {
            await signupDriver(newPackageData)
            fail('Expected signupDriver to throw a validation error')
        } catch (error) {
            expect(error).toBeDefined()
            error instanceof Error &&
                expect(error.message).toBe(
                    'Validation error: username is required'
                )
        }

        ;(signupDriver as jest.Mock).mockRestore()
    })
})
