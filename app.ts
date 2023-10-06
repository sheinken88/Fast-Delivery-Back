import express from 'express'
import router from './routes'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDB } from './config/db'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swaggerOptions'
import multer from 'multer'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin: [
            'http://54.159.77.78',
            'http://localhost:3000',
            'http://44.204.221.70:3000',
            'http://44.204.221.70:3001',
        ],
        credentials: true,
    })
)

const upload = multer()
app.use(upload.any())

app.use('/', router)
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs, { explorer: true })
)

connectDB()
    .then(() => {
        const PORT = process.env.PORT ?? 8080
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error)
        process.exit(1)
    })

export { app }
