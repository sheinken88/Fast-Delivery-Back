import { type Request, type Response } from 'express'
import {
    createOrder,
    getAllOrders,
    getOrdersByDriver,
    getOrderById,
    getDriverCurrentDelivery,
    completeOrder,
    cancelOrder,
    addPackagesToOrder,
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

export const get_driver_current_order = async (req: Request, res: Response) => {
    try {
        const currentDelivery = await getDriverCurrentDelivery(req.params.id)
        if (currentDelivery === null) res.status(200).send({ packages: [] })
        res.status(200).send(currentDelivery)
    } catch (error) {
        console.error('Get drivers current order controller error')
    }
}

export const create_order = async (req: Request, res: Response) => {
    try {
        const { driverToken, idPackages } = req.body
        const order = await createOrder(driverToken, idPackages)
        res.status(201).send(order)
    } catch (error) {
        console.error('Create order controller error', error)
    }
}

export const add_packages_to_delivery = async (req: Request, res: Response) => {
    try {
        const _id = req.params.id
        const packages = req.body.packages
        const editedOrder = await addPackagesToOrder(_id, packages)
        res.status(200).send(editedOrder)
    } catch (error) {
        console.error('add_packages_to_delivery controller error')
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
