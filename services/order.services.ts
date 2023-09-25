import { getTokenData } from '../config/token'
import type IPackage from '../interfaces/package.interface'
import { Driver, Package } from '../models'
import { Order } from '../models/order'
import { editPackage } from './package.services'

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

export const getDriverCurrentDelivery = async (id: string) => {
    try {
        const currentDelivery = await Order.findOne({
            driver: id,
            status: 'in progress',
        }).populate('packages')
        return currentDelivery
    } catch (error) {
        console.error(error)
        throw error
    }
}
export const createOrder = async (
    driverToken: string,
    idPackages: string[]
) => {
    try {
        const driverData = getTokenData(driverToken)
        const driver = await Driver.findOne({ email: driverData.email })
        const packages: IPackage[] = []

        for (const p of idPackages) {
            let foundPackage = await Package.findById(p)
            if (foundPackage != null)
                foundPackage = await editPackage(
                    { status: 'in progress' },
                    foundPackage._id
                )
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

        const packages: IPackage[] = []

        for (const p of order.packages) {
            let foundPackage = await Package.findById(p)
            if (foundPackage != null)
                foundPackage = await editPackage(
                    { status: 'delivered' },
                    foundPackage._id
                )
            if (foundPackage != null) {
                packages.push(foundPackage)
            } else {
                console.log(`Package with ID ${JSON.stringify(p)} not found.`)
            }
        }

        if (order.status === 'in progress') {
            order.status = 'delivered'
            order.packages = packages
            await order.save()
        } else {
            throw Error('The order is not in progress')
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

        const packages: IPackage[] = []

        for (const p of order.packages) {
            let foundPackage = await Package.findById(p)
            if (foundPackage != null)
                foundPackage = await editPackage(
                    { status: 'pending' },
                    foundPackage._id
                )
            if (foundPackage != null) {
                packages.push(foundPackage)
            } else {
                console.log(`Package with ID ${JSON.stringify(p)} not found.`)
            }
        }

        if (order.status === 'in progress') {
            order.status = 'canceled'
            order.packages = packages
            await order.save()
        } else {
            throw Error('The order is not in progress')
        }

        return order
    } catch (error) {
        console.error(error)
        throw error
    }
}
