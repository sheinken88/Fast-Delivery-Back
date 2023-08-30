export default interface IDriver {
    username: string
    email: string
    password: string
    phone_number: string
    status: boolean
    profile_pic: string
    validatePassword: (password: string) => Promise<boolean>
}
