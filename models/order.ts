import mongoose, { Schema } from 'mongoose'
import type IOrder from '../interfaces/order.interface'

// status types: ['pending', 'cancelled', 'completed']

const orderSchema: Schema = new Schema({
    status: { type: String, default: 'in progress' },
    driver: { type: Schema.Types.ObjectId, ref: 'Driver', required: true },
    packages: [{ type: Schema.Types.ObjectId, ref: 'Package', required: true }],
    date: { type: Date, default: Date.now },
})

export const Order = mongoose.model<IOrder>('Order', orderSchema)
