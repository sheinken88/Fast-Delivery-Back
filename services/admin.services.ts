import { Admin } from '../models/admin'

export const getAllAdmins = async () => {
    try {
        const admins = await Admin.find()
        return admins
    } catch (error) {
        console.log('getAllAdmins service error', error)
        throw error
    }
}

export const createAdmin = async (data: object) => {
    try {
        const newAdmin = new Admin(data)
        await newAdmin.save()
        return newAdmin
    } catch (error) {
        console.log('createAdmin service error', error)
        throw error
    }
}
