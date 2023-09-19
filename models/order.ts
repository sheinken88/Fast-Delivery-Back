import mongoose, { Schema } from 'mongoose'
import type IOrder from '../interfaces/order.interface'

// status types: ['pending', 'canceled', 'completed']

const orderSchema: Schema = new Schema({
    status: { type: String, default: 'pending' },
    driver: { type: Schema.Types.ObjectId, ref: 'Driver', required: true },
    packages: [{ type: Schema.Types.ObjectId, ref: 'Package', required: true }],
})

export const Order = mongoose.model<IOrder>('Order', orderSchema)
