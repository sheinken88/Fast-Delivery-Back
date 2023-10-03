import { type NextFunction, type Request, type Response } from 'express'
import { validateToken } from '../config/token'

export function validateUser(req: Request, res: Response, next: NextFunction) {
    const authorization: string | undefined = req.headers.authorization

    if (authorization === undefined) {
        res.status(401).json({ error: 'there is no logged driver' })
        return
    }

    const driver = validateToken(authorization)

    if (typeof driver === 'string') {
        res.status(401).json({ error: 'Access denied' })
        return
    }

    next()
}

export function validateAdmin(req: Request, res: Response, next: NextFunction) {
    const authorization: string | undefined = req.headers.authorization

    if (authorization === undefined) {
        res.status(401).json({ error: 'there is no logged admin' })
        return
    }

    const token = validateToken(authorization)

    if (
        typeof token === 'string' ||
        token.payload === undefined ||
        token.payload.is_admin === undefined ||
        token.payload.is_admin !== true
    ) {
        res.status(401).json({ error: 'Access denied' })
        return
    }

    next()
}
