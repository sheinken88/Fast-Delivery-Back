import { Driver } from '../../../models'
import { signupDriver } from '../../../services/driver.services'
import setupTestDb, { teardownTestDb } from '../../test-db-setup'

describe('CREATE DRIVER', () => {
    beforeAll(async () => {
        await setupTestDb()
    })

    afterAll(async () => {
        await teardownTestDb()
    })
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

        expect(newDriver).toHaveProperty('_id')
        expect(Driver.prototype.save).toHaveBeenCalledTimes(1)
        expect(newDriver.username).toEqual(mockDriverData.username)
        expect(newDriver.email).toEqual(mockDriverData.email)
        expect(newDriver.phone_number).toEqual(mockDriverData.phone_number)
        expect(newDriver.status).toEqual(mockDriverData.status)
        expect(newDriver.profile_pic).toEqual(mockDriverData.profile_pic)
        // expect(newDriver.packages).toEqual(mockDriverData.packages)
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
