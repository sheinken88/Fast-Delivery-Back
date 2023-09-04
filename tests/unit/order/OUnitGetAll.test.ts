import { getAllOrders } from '../../../services/order.services'

jest.mock('../../../services/order.services')

describe('Fetch Order', () => {
    const mockOrders = [
        {
            status: 'Pendiente',
            driver: 'iug3iu384893gijb',
            packages: ['obd3oub90b84n4ifhn', 'mhf04b98b3ibf43ofb'],
        },
        {
            status: 'Entregado',
            driver: 'buoi49f84b89g37vbdf',
            packages: ['asdodina89scgf79as8', 'advfjovb9ssdvgs9s7r'],
        },
    ]

    it('should fetch all Orders', async () => {
        ;(getAllOrders as jest.Mock).mockResolvedValueOnce(mockOrders)

        const orders = await getAllOrders()

        expect(orders).toEqual(mockOrders)
        ;(getAllOrders as jest.Mock).mockRestore()
    })

    it('should manage error in getAllOrders', async () => {
        ;(getAllOrders as jest.Mock).mockRejectedValueOnce(
            new Error('Error al obtener las ordenes')
        )

        try {
            await getAllOrders()
            fail('Expected getAllOrders to throw an error')
        } catch (error) {
            expect(error).toBeDefined()
            error instanceof Error &&
                expect(error.message).toBe('Error al obtener las ordenes')
        }

        ;(getAllOrders as jest.Mock).mockRestore()
    })
})
