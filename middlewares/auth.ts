import { type NextFunction, type Request, type Response } from 'express'
import { validateToken } from '../config/token'

declare module 'express' {
    export interface Request {
        user: string
    }
}

export function validateUser(req: Request, res: Response, next: NextFunction) {
    const token: string = req.body.user

    if (token == null) {
        res.status(401).send('access denied')
        return
    }

    const { user }: { user: string | null } = validateToken(token) as {
        user: string | null
    }

    if (user === null) {
        res.status(401).send('no hay usuario logueado')
        return
    }

    next()
}
