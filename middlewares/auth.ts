import { type NextFunction, type Request, type Response } from 'express'
import { validateToken } from '../config/token'

declare module 'express' {
    export interface Request {
        user: string
    }
}

export function validateUser(req: Request, res: Response, next: NextFunction) {
    const token: string = req.cookies.token

    if (token != null) return res.sendStatus(401)

    const { user }: { user: string | null } = validateToken(token) as {
        user: string | null
    }

    if (user != null) {
        req.user = user
        return res.sendStatus(401)
    }
    next()
}
