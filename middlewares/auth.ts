import { type NextFunction, type Request, type Response } from 'express'
import { validateToken } from '../config/token'

export function validateUser(req: Request, res: Response, next: NextFunction) {
    const authorization: string | undefined = req.headers.authorization

    if (authorization === undefined) {
        res.status(401).json({ error: 'Access denied' })
        return
    }

    const { user }: { user: string | null } = validateToken(authorization) as {
        user: string | null
    }

    if (user === null) {
        res.status(401).json({ error: 'Access denied' })
        return
    }

    next()
}
