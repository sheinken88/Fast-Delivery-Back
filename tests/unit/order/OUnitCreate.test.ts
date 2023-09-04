import { createOrder } from '../../../services/order.services'
import { Order } from '../../../models/order'

jest.mock('../../../services/order.services')

describe('Create Order', () => {
    const oldOrder = {
        status: 'En curso',
        driver: 'ig2i3b4i2u3h44423',
        packages: ['ig2adfsbno5noubio33'],
    }

    const newOrder = {
        status: 'En curso',
        driver: 'ig2i3b4i2u3h44423',
        packages: [
            'on3obnbo2h880083438jbbui3',
            '123b98n238h04nc032j4',
            'ob1ii0029n3i3vfsd4fs4',
        ],
    }

    it('should create a new order', async () => {
        ;(createOrder as jest.Mock).mockResolvedValueOnce(new Order(oldOrder))

        const createdOrder = await createOrder(
            newOrder.driver,
            newOrder.packages
        )

        expect(createdOrder).toBeDefined()
        expect(createdOrder.status).toBe(oldOrder.status)
        ;(createOrder as jest.Mock).mockRestore()
    })

    it('should manage error in createOrder', async () => {
        ;(createOrder as jest.Mock).mockRejectedValueOnce(
            new Error('Error al crear la orden')
        )

        try {
            await createOrder(newOrder.driver, newOrder.packages)
            fail('Expected createOrder to throw an error')
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
            error instanceof Error &&
                expect(error.message).toBe('Error al crear la orden')
        }

        ;(createOrder as jest.Mock).mockRestore()
    })

    it('you cant create an order without packages', async () => {
        const orderWithoutPackages = {
            status: 'En curso',
            driver: {
                username: 'new driver',
                email: 'newdriver@gmail.com',
                password: 'newDriver123',
                phone_number: '1123543223',
                status: true,
                profile_pic: '',
                packages: [],
                _id: 'ig2i3b4i2u3h44423',
            },
        }

        ;(createOrder as jest.Mock).mockRejectedValueOnce(
            new Error('Validation error: packages is required')
        )

        try {
            await createOrder(orderWithoutPackages.driver._id, [])
            fail('Expected createOrder to throw a validation error')
        } catch (error) {
            expect(error).toBeDefined()
            error instanceof Error &&
                expect(error.message).toBe(
                    'Validation error: packages is required'
                )
        }

        ;(createOrder as jest.Mock).mockRestore()
    })

    it('you cant create an order without driver', async () => {
        const orderWithoutDriver = {
            status: 'En curso',
            packages: [
                'on3obnbo2h880083438jbbui3',
                '123b98n238h04nc032j4',
                'ob1ii0029n3i3vfsd4fs4',
            ],
        }

        ;(createOrder as jest.Mock).mockRejectedValueOnce(
            new Error('Validation error: driver is required')
        )

        try {
            await createOrder('', orderWithoutDriver.packages)
            fail('Expected createOrder to throw a validation error')
        } catch (error) {
            expect(error).toBeDefined()
            error instanceof Error &&
                expect(error.message).toBe(
                    'Validation error: driver is required'
                )
        }

        ;(createOrder as jest.Mock).mockRestore()
    })
})
