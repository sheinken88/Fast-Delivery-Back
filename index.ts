import express from 'express'
import router from './routes'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'

const app = express()
const PORT = parseInt(process.env.PORT!)
const USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.DB_PASSWORD
const DB = process.env.DB
const HOSTNAME = process.env.DB_HOSTNAME

const url = `mongodb+srv://${USERNAME}:${PASSWORD}@${HOSTNAME}/${DB}`

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/', router)

const options = {
    connectTimeoutMS: 30000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: USERNAME,
    pass: PASSWORD,
}

mongoose
    .connect(url, options)
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error)
    })
