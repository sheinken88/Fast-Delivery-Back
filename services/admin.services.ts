import { Admin } from '../models'
import { generateToken, getTokenData, validateToken } from '../config/token'
import type { ITokenAdmin } from '../interfaces/token'
import type IAdminEdit from '../interfaces/adminEdit.interface'

export const getAllAdmins = async () => {
    try {
        const admins = await Admin.find()
        return admins
    } catch (error) {
        console.error('getAllAdmins service error', error)
        throw error
    }
}

export const editAdminService = async (id: string, data: IAdminEdit) => {
    try {
        if (data === null) throw new Error('Theres no data to edit')
        if (id === null) throw new Error('Theres no admin id')
        const { username, email, profile_pic } = data
        const editedAdmin = await Admin.findOneAndUpdate(
            { _id: id },
            { username, email, profile_pic },
            { new: true }
        )
        return editedAdmin
    } catch (error) {
        console.error('editAdmin service error', error)
        throw new Error('editAdmin service error')
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

export const loginAdmin = async (data: ITokenAdmin) => {
    try {
        const token = generateToken(data)
        return token
    } catch (error) {
        console.error('loginAdmin service error', error)
        throw error
    }
}

export const validateUserService = async (
    authorization: string | undefined
) => {
    try {
        if (authorization === undefined)
            throw new Error('validateUser admin service error')
        validateToken(authorization)

        const tokenData = getTokenData(authorization).email

        const admin = await Admin.findOne({ email: tokenData })

        if (admin === null) {
            throw new Error('Admin not found')
        }
        const { _id, email, username, profile_pic } = admin
        return { _id, email, username, profile_pic }
    } catch (error) {
        console.error('validateUser admin service error', error)
        throw Error('validateUser admin service error')
    }
}
