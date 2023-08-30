import type IPackage from '../interfaces/package.interface'
import { Driver, Package } from '../models'
import { Order } from '../models/order'

export const getAllOrders = async () => {
    try {
        const orders = await Order.find().populate('packages')
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
