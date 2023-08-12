import express from "express"
import { login } from "../controllers/userController"

const userRouter = express.Router()

userRouter.get("/secret", login)

export default userRouter