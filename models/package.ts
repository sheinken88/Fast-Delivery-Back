import mongoose, { Schema } from 'mongoose'
import type IPackage from '../interfaces/package.interface'

const packageSchema: Schema = new Schema({
    status: { type: String, default: 'pending' },
    receiver_name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    weight: { type: Number, required: true },
    quantity: { type: Number, required: true },
})

const Package = mongoose.model<IPackage>('Package', packageSchema)

export default Package
