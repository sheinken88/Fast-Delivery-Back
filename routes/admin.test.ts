import request from 'supertest'
// import { app } from '../app'

describe('GET /', () => {
    it('should return a list of admins', async () => {
        const response = await request('localhost:8080').get('/admins')
        expect(response.status).toBe(200)
    })
})
