import { Admin } from '../models'
import { generateToken } from '../config/token'
import type IToken from '../interfaces/token'

export const getAllAdmins = async () => {
    try {
        const admins = await Admin.find()
        return admins
    } catch (error) {
        console.log('getAllAdmins service error', error)
        throw error
    }
}

export const signupAdmin = async (data: object) => {
    try {
        const newAdmin = new Admin(data)
        await newAdmin.save()
        return newAdmin
    } catch (error) {
        console.log('createAdmin service error', error)
        throw error
    }
}

export const loginAdmin = async (data: IToken) => {
    try {
        const token = generateToken(data)
        return token
    } catch (error) {
        console.log('loginAdmin service error', error)
        throw error
    }
}
