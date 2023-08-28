import mongoose, { Schema } from 'mongoose'
import type IPackage from '../interfaces/package.interface'

const packageSchema: Schema = new Schema({
    status: { type: String, required: true },
    receiver_name: { type: String, required: true },
    address: { type: String, required: true },
    weight: { type: Number, required: true },
    quantity: { type: Number, required: true },
})

export const Package = mongoose.model<IPackage>('Package', packageSchema)
