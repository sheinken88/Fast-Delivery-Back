import mongoose, { type CallbackError, Schema } from 'mongoose'
import type IAdmin from '../interfaces/admin.interface'
import bcrypt from 'bcrypt'

const adminSchema: Schema = new Schema({
    is_admin: { type: Boolean, default: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_pic: {
        type: String,
        default:
            'https://res.cloudinary.com/db3pcwsrm/image/upload/v1696036778/fast-delivery/assets/generic_profile_pic.png',
    },
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
