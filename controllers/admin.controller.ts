import { type Request, type Response } from 'express'
import {
    getAllAdmins,
    loginAdmin,
    signupAdmin,
} from '../services/admin.services'
import { Admin } from '../models'

export const get_all_admins = async (_req: Request, res: Response) => {
    try {
        const admins = await getAllAdmins()
        res.status(200).send(admins)
    } catch (error) {
        console.error('Error fetching admins:', error)
        res.sendStatus(500)
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
        if (admin == null) throw new Error('Driver not found')

        const isValid = await admin.validatePassword(password)
        if (!isValid) throw new Error('Incorrect data')

        const { username, id } = admin
        const token = await loginAdmin({ username, email })

        res.cookie('token', token)
        res.status(200).json({
            message: 'Admin logged correctly',
            token,
            user: { id, email, username },
        })
    } catch (error) {
        console.error('Error logging admin', error)
        res.status(500).send('login_admin controller error')
    }
}

export const logout_admin = (_req: Request, res: Response) => {
    try {
        res.clearCookie('token')
        res.sendStatus(200)
    } catch (error) {
        console.error('Error logging out admin', error)
        res.status(500).send('logout_admin controller error')
    }
}
