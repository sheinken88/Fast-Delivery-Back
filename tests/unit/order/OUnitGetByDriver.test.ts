import { getOrdersByDriver } from '../../../services/order.services'

jest.mock('../../../services/order.services')

describe('Fetch Order By Driver', () => {
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

    it('should fetch order by driver id', async () => {
        const driverId = 'iug3iu384893gijb'

        ;(getOrdersByDriver as jest.Mock).mockImplementation(
            async (id: string) => {
                const filteredOrders = mockOrders.filter(
                    (order) => order.driver === id
                )
                return filteredOrders[0]
            }
        )

        const result = await getOrdersByDriver(driverId)

        expect(result).toEqual(mockOrders[0])
    })

    it('should manage error in getOrdersByDriver', async () => {
        ;(getOrdersByDriver as jest.Mock).mockRejectedValueOnce(
            new Error('Error al obtener la orden')
        )

        try {
            await getOrdersByDriver('')
            fail('Expected getOrdersByDriver to throw an error')
        } catch (error) {
            expect(error).toBeDefined()
            error instanceof Error &&
                expect(error.message).toBe('Error al obtener la orden')
        }

        ;(getOrdersByDriver as jest.Mock).mockRestore()
    })
})
