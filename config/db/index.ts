import mongoose from 'mongoose'

const USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.DB_PASSWORD

const url = process.env.MONGO_URI!

export const connectDB = async () => {
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
