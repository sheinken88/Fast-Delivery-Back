import mongoose, { Schema } from 'mongoose'
import type IPackage from '../interfaces/package.interface'

const packageSchema: Schema = new Schema({
    status: String,
    receiver_name: String,
    address: String,
    weight: Number,
    quantity: Number,
})

export const Package = mongoose.model<IPackage>('Package', packageSchema)
