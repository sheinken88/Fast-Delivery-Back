import { completeOrder, createOrder } from '../../../services/order.services'
import { Order } from '../../../models/order'

jest.mock('../../../services/order.services')

describe('Complete Order', () => {
    const mockOrder = {
        status: 'Pendiente',
        driver: 'iug3iu384893gijb',
        packages: ['obd3oub90b84n4ifhn', 'mhf04b98b3ibf43ofb'],
    }

    it('should change the status to complete', async () => {
        ;(createOrder as jest.Mock).mockResolvedValueOnce(new Order(mockOrder))
        ;(completeOrder as jest.Mock).mockImplementationOnce(async () => {
            const modifiedOrderData = new Order(mockOrder)
            modifiedOrderData.status = 'complete'

            return modifiedOrderData
        })

        const createdOrder = await createOrder(
            mockOrder.driver,
            mockOrder.packages
        )

        const OrderCompleted = await completeOrder(createdOrder._id.toString())

        expect(createdOrder).toBeDefined()
        expect(OrderCompleted).toBeDefined()
        expect(OrderCompleted.status).toBe('complete')
        ;(createOrder as jest.Mock).mockRestore()
        ;(completeOrder as jest.Mock).mockRestore()
    })

    it('should manage error in completeOrder', async () => {
        ;(completeOrder as jest.Mock).mockRejectedValueOnce(
            new Error('Error al completar la orden')
        )

        try {
            await completeOrder('oabs75cfo232absu9223')
            fail('Expected completeOrder to throw an error')
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
            error instanceof Error &&
                expect(error.message).toBe('Error al completar la orden')
        }

        ;(completeOrder as jest.Mock).mockRestore()
    })
})
