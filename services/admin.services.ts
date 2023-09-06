import { Admin } from '../models'
import { generateToken } from '../config/token'
import type IToken from '../interfaces/token'

export const getAllAdmins = async () => {
    try {
        const admins = await Admin.find()
        return admins
    } catch (error) {
        console.error('getAllAdmins service error', error)
        throw error
    }
}

export const signupAdmin = async (data: object) => {
    try {
        const newAdmin = new Admin(data)
        const foundAdmin = await Admin.findOne(data)

        if (foundAdmin !== null) throw Error('Admin already axists')
        await newAdmin.save()

        return newAdmin
    } catch (error) {
        console.error('createAdmin service error', error)
        throw error
    }
}

export const loginAdmin = async (data: IToken) => {
    try {
        const token = generateToken(data)
        return token
    } catch (error) {
        console.error('loginAdmin service error', error)
        throw error
    }
}
