import { getAllPackages } from '../../../services/package.services'
import setupTestDb, { teardownTestDb } from '../../test-db-setup'

describe('Fetch Packages', () => {
    beforeAll(async () => {
        await setupTestDb()
    })

    afterAll(async () => {
        await teardownTestDb()
    })

    it('should fetch all Packages', async () => {
        const packages = await getAllPackages()

        expect(packages).toBeDefined()
        expect(Array.isArray(packages)).toBe(true)
        expect(typeof packages[0].receiver_name).toBe('string')
    })
})
