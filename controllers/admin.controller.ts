import { type Request, type Response } from 'express'
import {
    getAllAdmins,
    loginAdmin,
    signupAdmin,
    validateUserService,
    editAdminService,
} from '../services/admin.services'
import { Admin } from '../models'

export const secret = async (req: Request, res: Response) => {
    try {
        const admin = await validateUserService(req.headers.authorization)

        res.status(200).send({
            user: admin,
        })
    } catch (error) {
        console.error('Error in admin secret', error)
        res.status(500).send('admin secret controller error')
    }
}

export const get_all_admins = async (_req: Request, res: Response) => {
    try {
        const admins = await getAllAdmins()
        res.status(200).send(admins)
    } catch (error) {
        console.error('Error fetching admins:', error)
        res.sendStatus(500)
    }
}

export const editAdmin = async (req: Request, res: Response) => {
    try {
        const editedAdmin = await editAdminService(req.params.id, req.body.data)
        console.log('editedAdmin', editedAdmin)
        res.status(200).send(editedAdmin)
    } catch (error) {
        console.error('Error editing admin: ', error)
    }
}
export const signup_admin = async (req: Request, res: Response) => {
    try {
        const newAdmin = await signupAdmin(req.body)
        res.status(200).send(newAdmin)
    } catch (error) {
        console.error('Error creating admin:', error)
        res.sendStatus(500)
    }
}

export const login_admin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const admin = await Admin.findOne({ email })
        if (admin === null) throw new Error('Admin not found')

        const isValid = await admin.validatePassword(password)
        if (!isValid) throw new Error('Incorrect data')

        const { username, is_admin } = admin
        const token = await loginAdmin({ username, email, is_admin })

        res.status(200).json({
            message: 'Admin logged correctly',
            token,
            user: { email, username },
        })
    } catch (error) {
        console.error('Error logging admin', error)
        res.status(500).send('login_admin controller error')
    }
}
