import mongoose, { Schema } from 'mongoose'
import type IDriver from '../interfaces/driver.interface'

const driverSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone_number: { type: String, required: true },
    status: { type: Boolean, required: true },
    profile_pic: { type: String, required: true },
    packages: { type: Array, required: true },
})

export const Driver = mongoose.model<IDriver>('Driver', driverSchema)
