import type IDriver from '../interfaces/driver.interface'
import mongoose, { type CallbackError, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const driverSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function (value: string) {
            const emailRegex =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            return emailRegex.test(value)
        },
    },
    password: { type: String, required: true },
    phone_number: { type: String, required: true, unique: true },
    status: { type: Boolean, default: true },
    profile_pic: String,
    salt: String,
})

driverSchema.methods.validatePassword = async function (
    password: string
): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt)
    return hash === this.password
}

driverSchema.pre('save', async function (next) {
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

const Driver = mongoose.model<IDriver>('Driver', driverSchema)

export default Driver
