import { getAllAdmins } from '../../../services/admin.services'

jest.mock('../../../services/admin.services')

describe('GET ALL ADMINS', () => {
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

    it('should fetch all admins', async () => {
        ;(getAllAdmins as jest.Mock).mockResolvedValueOnce(mockAdmins)

        const admins = await getAllAdmins()

        expect(admins).toEqual(mockAdmins)
        ;(getAllAdmins as jest.Mock).mockRestore()
    })

    it('Should handle errors', async () => {
        ;(getAllAdmins as jest.Mock).mockRejectedValueOnce(
            new Error('Error al obtener los paquetes')
        )

        try {
            await getAllAdmins()
            fail('Expected getAllAdmins to throw an error')
        } catch (error) {
            expect(error).toBeDefined()
            error instanceof Error &&
                expect(error.message).toBe('Error al obtener los paquetes')
        }

        ;(getAllAdmins as jest.Mock).mockRestore()
    })
})
