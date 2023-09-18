import { type Request, type Response } from 'express'
import {
    signupDriver,
    getAllDrivers,
    loginDriver,
    updateDriverProfile,
} from '../services/driver.services'
import { Driver } from '../models'
import type IToken from '../interfaces/token'

export const get_all_drivers = async (_req: Request, res: Response) => {
    try {
        const drivers = await getAllDrivers()
        res.status(200).send(drivers)
    } catch (error) {
        console.error('Error fetching drivers:', error)
        res.sendStatus(500)
    }
}

export const signup_driver = async (req: Request, res: Response) => {
    try {
        const newDriver = await signupDriver(req.body)
        res.status(201).send(newDriver)
    } catch (error) {
        console.error('Error creating driver:', error)
        res.sendStatus(500)
    }
}

export const login_driver = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const driver = await Driver.findOne({ email })

        if (driver == null) throw new Error('Driver not found')

        const isValid = await driver.validatePassword(password)
        if (!isValid) throw new Error('Incorrect password')

        const { _id, username, profile_pic, phone_number, status } = driver
        const data: IToken = { username, email }
        const token = await loginDriver(data)

        res.status(200).json({
            token,
            user: {
                _id,
                username,
                email,
                profile_pic,
                phone_number,
                status,
            },
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error logging driver', error)
            res.status(500).send(error.message)
        } else {
            res.status(500).send('An unknown error occurred')
        }
    }
}
// export const secret = (req: Request, res: Response) => {
//     try {
//         const { payload } = validateToken(req.cookies.token);
//         req.driver = payload;
//         res.send(payload);
//     } catch (error) {
//         console.error('Error in driver secret', error);
//         res.status(500).send('driver secret controller error');
//     }
// }

export const update_driver_profile = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        console.log('Req.body:', req.body)

        const updatedDriver = await updateDriverProfile(id, req.body)

        res.status(200).send(updatedDriver)
    } catch (error) {
        console.error('Error updating driver:', error)
        res.sendStatus(500)
    }
}
