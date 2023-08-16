import mongoose, { Schema } from 'mongoose'
import type IAdmin from '../interfaces/admin'

const adminSchema: Schema = new Schema({
    username: String,
    email: String,
    password: String,
    profile_pic: String,
})

export const Admin = mongoose.model<IAdmin>('Admin', adminSchema)
