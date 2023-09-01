import type IPackage from '../interfaces/package.interface'
import { Driver, Package } from '../models'
import { Order } from '../models/order'

export const getAllOrders = async () => {
    try {
        const orders = await Order.find()
            .populate('packages')
            .populate('driver')
        return orders
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const getOrderById = async (id: string) => {
    try {
        const orders = await Order.findOne({ _id: id })
            .populate('driver')
            .populate('packages')
        return orders
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const getOrdersByDriver = async (driverId: string) => {
    try {
        const orders = await Order.find({ driver: driverId }).populate(
            'packages'
        )
        return orders
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const createOrder = async (driverId: string, idPackages: string[]) => {
    try {
        const driver = await Driver.findOne({ _id: driverId })

        const packages: IPackage[] = []
        for (const p of idPackages) {
            const foundPackage = await Package.findById(p)
            if (foundPackage != null) {
                packages.push(foundPackage)
            } else {
                console.log(`Package with ID ${p} not found.`)
            }
        }

        const newOrder = new Order({ driver, packages })
        await newOrder.save()

        return newOrder
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const completeOrder = async (id: string) => {
    try {
        const order = await Order.findOne({ _id: id })

        if (order == null)
            throw new Error('No se encontró la orden con ese ID.')

        if (order.status === 'pending') {
            order.status = 'complete'
            await order.save()
        } else {
            throw Error('The order is not pending')
        }
        return order
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const cancelOrder = async (id: string) => {
    try {
        const order = await Order.findOne({ _id: id })

        if (order == null) {
            throw Error('No se encontró la orden con ese ID.')
        }

        if (order.status === 'pending') {
            order.status = 'canceled'
            await order.save()
        } else {
            throw Error('The order is not pending')
        }

        return order
    } catch (error) {
        console.error(error)
        throw error
    }
}
