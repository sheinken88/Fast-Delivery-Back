import { getOrderById } from '../../../services/order.services'

jest.mock('../../../services/order.services')

describe('Fetch Order By Id', () => {
    const mockOrders = [
        {
            _id: '1',
            status: 'Pendiente',
            driver: 'iug3iu384893gijb',
            packages: ['obd3oub90b84n4ifhn', 'mhf04b98b3ibf43ofb'],
        },
        {
            _id: '2',
            status: 'Entregado',
            driver: 'buoi49f84b89g37vbdf',
            packages: ['asdodina89scgf79as8', 'advfjovb9ssdvgs9s7r'],
        },
    ]

    it('should fetch order by id', async () => {
        const driverId = '1'

        ;(getOrderById as jest.Mock).mockImplementation(async (id: string) => {
            const filteredOrders = mockOrders.filter(
                (order) => order._id === id
            )
            return filteredOrders[0]
        })

        const result = await getOrderById(driverId)

        expect(result).toMatchObject(mockOrders[0])
    })

    it('should manage error in getOrderById', async () => {
        ;(getOrderById as jest.Mock).mockRejectedValueOnce(
            new Error('Error al obtener la orden')
        )

        try {
            await getOrderById('')
            fail('Expected getOrderById to throw an error')
        } catch (error) {
            expect(error).toBeDefined()
            error instanceof Error &&
                expect(error.message).toBe('Error al obtener la orden')
        }

        ;(getOrderById as jest.Mock).mockRestore()
    })
})
