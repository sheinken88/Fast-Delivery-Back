import type IOrder from 'interfaces/order.interface'
import { getTokenData } from '../config/token'
import type IPackage from '../interfaces/package.interface'
import { Driver, Package } from '../models'
import { Order } from '../models/order'
import { editPackageStatus } from './package.services'

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

export const getOrdersByDriverAndDate = async (
    driverId: string,
    date: Date
) => {
    try {
        const startOfDay = new Date(date)
        startOfDay.setHours(0, 0, 0, 0)

        const endOfDay = new Date(date)
        endOfDay.setHours(23, 59, 59, 999)

        const orders = await Order.find({
            driver: driverId,
            date: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        }).populate('packages')
        return orders
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const hasDeliveredTenPackagesToday = async (orders: IOrder[]) => {
    try {
        const count = orders.reduce((total, order) => {
            return (
                total +
                order.packages.reduce((packageCount, packageStatus) => {
                    return (
                        packageCount +
                        (packageStatus.status !== 'pending' &&
                        order.status !== 'cancelled'
                            ? 1
                            : 0)
                    )
                }, 0)
            )
        }, 0)
        return count
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
        }).populate({
            path: 'packages',
            match: { status: 'in progress' },
        })
        return currentDelivery
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const getPackagesInProgresFromOrder = async (driverId: string) => {
    try {
        const orders = await Order.find({
            driver: driverId,
            status: 'in progress',
        }).populate('packages')

        const inProgresPackages = orders.flatMap((order) => {
            return order.packages.filter(
                (packageWith) => packageWith.status === 'in progress'
            )
        })

        return inProgresPackages
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const getPackagesDeliveredFromOrder = async (driverId: string) => {
    try {
        const orders = await Order.find({ driver: driverId }).populate(
            'packages'
        )

        const deliveredPackages = orders.flatMap((order) => {
            return order.packages.filter(
                (packageWith) =>
                    packageWith.status === 'delivered' &&
                    order.status !== 'cancelled'
            )
        })

        return deliveredPackages
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const getPackagesDeliveredFromOrderToday = async (driverId: string) => {
    try {
        const startOfDay = new Date()
        startOfDay.setHours(0, 0, 0, 0)

        const endOfDay = new Date()
        endOfDay.setHours(23, 59, 59, 999)
        const orders = await Order.find({
            driver: driverId,
            date: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        }).populate('packages')

        const deliveredPackages = orders.flatMap((order) => {
            return order.packages.filter(
                (packageWith) => packageWith.status === 'delivered'
            )
        })

        return deliveredPackages
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
            if (foundPackage !== null)
                foundPackage = await editPackageStatus(
                    { status: 'in progress' },
                    foundPackage._id
                )
            if (foundPackage !== null) {
                packages.push(foundPackage)
            } else {
                console.error(`Package with ID ${p} not found.`)
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

export const addPackagesToOrder = async (_id: string, packages: IPackage[]) => {
    try {
        const order = await Order.findOneAndUpdate(
            { _id },
            { $push: { packages: { $each: packages } } },
            { new: true }
        )
        return order
    } catch (error) {
        console.error('addPackagesToOrder service error', error)
        throw error
    }
}

export const completeOrder = async (id: string) => {
    try {
        const order = await Order.findOne({ _id: id })

        if (order === null)
            throw new Error('No se encontró la orden con ese ID.')

        if (order.status === 'in progress') {
            order.status = 'delivered'
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

        if (order === null) {
            throw Error('No se encontró la orden con ese ID.')
        }

        const packages: IPackage[] = []

        for (const p of order.packages) {
            let foundPackage = await Package.findById(p)

            if (foundPackage !== null && foundPackage.status !== 'delivered')
                foundPackage = await editPackageStatus(
                    { status: 'pending' },
                    foundPackage._id
                )
            if (foundPackage !== null && foundPackage.status === 'delivered') {
                packages.push(foundPackage)
            } else {
                console.error(`Package with ID ${JSON.stringify(p)} not found.`)
            }
        }

        if (order.status === 'in progress') {
            if (packages.some((p) => p.status === 'delivered'))
                order.status = 'complete'
            else order.status = 'cancelled'
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
