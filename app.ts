import express from 'express'
import router from './routes'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/', router)

export { app }
