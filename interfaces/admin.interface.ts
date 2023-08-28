export default interface IAdmin {
    username: string
    email: string
    password: string
    profile_pic: string
    validatePassword: (password: string) => Promise<boolean>
}
