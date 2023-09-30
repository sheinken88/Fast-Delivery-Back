import jwt, { type Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'
import type { IToken } from '../../interfaces/token'
import type IPayload from '../../interfaces/payload.interface'

dotenv.config()

const SECRET: Secret | undefined = process.env.SECRET

export const generateToken = (payload: IToken) => {
    const token = jwt.sign({ payload }, SECRET!, { expiresIn: '5h' })
    return token
}

export const validateToken = (token: string) => {
    try {
        const decodedToken = jwt.verify(token, SECRET!)
        return decodedToken
    } catch (error) {
        throw new Error('Token no válido')
    }
}

export const getTokenData = (token: string) => {
    const decoded = jwt.decode(token) as IPayload
    return decoded.payload
}
