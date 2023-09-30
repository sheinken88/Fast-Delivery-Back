export default interface IAdmin {
    is_admin: boolean
    username: string
    email: string
    password: string
    profile_pic: string
    validatePassword: (password: string) => Promise<boolean>
}
