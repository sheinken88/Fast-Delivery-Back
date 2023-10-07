import type IStatement from './statement.interface'

export default interface IDriver {
    _id: string
    username: string
    email: string
    password: string
    phone_number: string
    status: boolean
    profile_pic: string
    statements: IStatement[]
    validatePassword: (password: string) => Promise<boolean>
}
