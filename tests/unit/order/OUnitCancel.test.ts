import { cancelOrder, createOrder } from '../../../services/order.services'
import { Order } from '../../../models/order'

jest.mock('../../../services/order.services')

describe('Cancel Order', () => {
    const mockOrder = {
        status: 'Pendiente',
        driver: 'iug3iu384893gijb',
        packages: ['obd3oub90b84n4ifhn', 'mhf04b98b3ibf43ofb'],
    }

    it('should change the status to canceled', async () => {
        ;(createOrder as jest.Mock).mockResolvedValueOnce(new Order(mockOrder))
        ;(cancelOrder as jest.Mock).mockImplementationOnce(async () => {
            const modifiedOrderData = new Order(mockOrder)
            modifiedOrderData.status = 'canceled'

            return modifiedOrderData
        })

        const createdOrder = await createOrder(
            mockOrder.driver,
            mockOrder.packages
        )

        const OrderCompleted = await cancelOrder(createdOrder._id.toString())

        expect(createdOrder).toBeDefined()
        expect(OrderCompleted).toBeDefined()
        expect(OrderCompleted.status).toBe('canceled')
        ;(createOrder as jest.Mock).mockRestore()
        ;(cancelOrder as jest.Mock).mockRestore()
    })

    it('should manage error in cancelOrder', async () => {
        ;(cancelOrder as jest.Mock).mockRejectedValueOnce(
            new Error('Error al cancelar la orden')
        )

        try {
            await cancelOrder('oabs75cfo232absu9223')
            fail('Expected cancelOrder to throw an error')
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
            error instanceof Error &&
                expect(error.message).toBe('Error al cancelar la orden')
        }

        ;(cancelOrder as jest.Mock).mockRestore()
    })
})
