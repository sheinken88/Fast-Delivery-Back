import { type Request, type Response } from 'express'
import {
    createOrder,
    getAllOrders,
    getOrdersByDriver,
    getOrderById,
    completeOrder,
    cancelOrder,
} from '../services/order.services'

export const get_all_orders = async (_req: Request, res: Response) => {
    try {
        const orders = await getAllOrders()
        res.status(200).send(orders)
    } catch (error) {
        console.error('Get all orders controller error', error)
    }
}

export const get_order_by_id = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const order = await getOrderById(id)
        res.status(200).send(order)
    } catch (error) {
        console.error('Get order by id controller error', error)
    }
}

export const get_orders_by_driver = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const order = await getOrdersByDriver(id)
        res.status(200).send(order)
    } catch (error) {
        console.error('Get order by driver controller error', error)
    }
}

export const create_order = async (req: Request, res: Response) => {
    try {
        const { driverToken, packages } = req.body
        const order = await createOrder(driverToken, packages)
        res.status(201).send(order)
    } catch (error) {
        console.error('Create order controller error', error)
    }
}

export const complete_order = async (req: Request, res: Response) => {
    try {
        const order = await completeOrder(req.params.id)
        res.status(200).send(order)
    } catch (error) {
        console.error('Create order controller error', error)
        res.status(404).send('ID not found')
    }
}

export const cancel_order = async (req: Request, res: Response) => {
    try {
        const order = await cancelOrder(req.params.id)
        res.status(200).send(order)
    } catch (error) {
        console.error('Create order controller error', error)
        res.status(404).send('ID not found')
    }
}
