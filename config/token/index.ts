import jwt, { type Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'
import type IToken from '../../interfaces/token'

dotenv.config()

const SECRET: Secret | undefined = process.env.SECRET

export const generateToken = (payload: IToken) => {
    const token = jwt.sign({ payload }, SECRET!, { expiresIn: '5h' })
    return token
}

export const validateToken = (token: string) => {
    return jwt.verify(token, SECRET!)
}
