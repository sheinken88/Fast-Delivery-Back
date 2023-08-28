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

        const driver = await Admin.findOne({ email })
        if (driver == null) throw new Error('Driver not found')

        const isValid = await driver.validatePassword(password)
        if (!isValid) throw new Error('Incorrect data')

        const { username } = driver
        const token = await loginAdmin({ username, email })
        console.log('token:', token)
        res.cookie('token', token)
        res.status(200).send('Admin logged successfully')
    } catch (error) {
        console.error('Error logging admin', error)
        // res.status(500).send('login_admin controller error')
        throw error
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
