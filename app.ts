import express from 'express'
import router from './routes'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDB } from './config/db'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/', router)

connectDB()
    .then(() => {
        const PORT = process.env.PORT ?? 3000
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error)
        process.exit(1)
    })

export { app }
