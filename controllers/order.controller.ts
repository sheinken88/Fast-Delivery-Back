import { type Request, type Response } from 'express'
import { createOrder, getAllOrders } from '../services/order.services'

export const get_all_orders = async (_req: Request, res: Response) => {
    try {
        const orders = await getAllOrders()
        res.status(200).send(orders)
    } catch (error) {
        console.error('Get all orders controller error', error)
    }
}

export const create_order = async (req: Request, res: Response) => {
    try {
        const { driverId, packages } = req.body
        const order = await createOrder(driverId, packages)
        res.status(201).send(order)
    } catch (error) {
        console.error('Create order controller error', error)
    }
}
