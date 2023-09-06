import { type Request, type Response } from 'express'
import { generateToken } from '../config/token'

export const login = (req: Request, res: Response) => {
    try {
        const { text } = req.body
        const token = generateToken(text)
        res.cookie('token', token)
        res.status(200).send(token)
    } catch (error) {
        console.error(error)
    }
}
