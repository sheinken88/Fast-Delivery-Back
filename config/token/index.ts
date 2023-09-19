import jwt, { type Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'
import type IToken from '../../interfaces/token'

dotenv.config()

interface IPayload {
    payload: {
        username: string
        email: string
    }
}

const SECRET: Secret | undefined = process.env.SECRET

export const generateToken = (payload: IToken) => {
    const token = jwt.sign({ payload }, SECRET!, { expiresIn: '5h' })
    return token
}

export const validateToken = (token: string) => {
    return jwt.verify(token, SECRET!)
}

export const getTokenData = (token: string) => {
    const decoded = jwt.decode(token) as IPayload
    return decoded.payload
}
