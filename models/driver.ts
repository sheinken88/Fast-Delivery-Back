import mongoose, { Schema } from 'mongoose'
import type IDriver from '../interfaces/driver.interface'

const driverSchema: Schema = new Schema({
    username: String,
    email: String,
    password: String,
    phone_number: String,
    status: Boolean,
    profile_pic: String,
    packages: Array,
})

export const Driver = mongoose.model<IDriver>('Driver', driverSchema)
