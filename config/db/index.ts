import mongoose from 'mongoose'

export const connectDB = async () => {
    const USERNAME = process.env.DB_USERNAME
    const PASSWORD = process.env.DB_PASSWORD
    const DB = process.env.DB
    const HOSTNAME = process.env.DB_HOSTNAME

    const url = `mongodb+srv://${USERNAME}:${PASSWORD}@${HOSTNAME}/${DB}`

    const options = {
        connectTimeoutMS: 30000,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: USERNAME,
        pass: PASSWORD,
    }

    await mongoose.connect(url, options)
    console.log('Connected to MongoDB')
}
