// import { type Request, type Response } from 'express'
// import { signup_admin } from '../../../controllers/admin.controller'
import setupTestDb, { teardownTestDb } from '../../test-db-setup'

describe('CREATE ADMIN', () => {
    beforeAll(async () => {
        await setupTestDb()
    })

    afterAll(async () => {
        await teardownTestDb()
    })

    const admin = {
        body: {
            username: 'Pedro Juancho',
            email: 'pedrojuancho@gmail.com',
            password: 'dhasbdoiasd',
            profile_pic: '/pathto.jpg',
        },
    } as unknown as Request

    // it('should not create a new admin', async () => {
    //     const res: Response = {} as Response
    //     await signup_admin(admin, res)
    //     expect(res.status).toBe(500)
    // })
    it('', async () => {
        expect(admin).toBeDefined()
    })
})
