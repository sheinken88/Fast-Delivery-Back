import mongoose, { type CallbackError, Schema } from 'mongoose'
import type IAdmin from '../interfaces/admin.interface'
import bcrypt from 'bcrypt'

const adminSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile_pic: String,
    salt: String,
})

adminSchema.methods.validatePassword = async function (
    password: string
): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt)
    return hash === this.password
}

adminSchema.pre('save', async function (next) {
    if (!this.isModified('password') || this.isNew) {
        try {
            const salt = bcrypt.genSaltSync(10)
            this.salt = salt

            const hashedPassword = await bcrypt.hash(this.password, this.salt)
            this.password = hashedPassword
            next()
        } catch (error) {
            console.error('Error encripting password:', error)
            next(error as CallbackError)
        }
    }
})

export const Admin = mongoose.model<IAdmin>('Admin', adminSchema)
