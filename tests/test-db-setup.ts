import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export default async function setupTestDb() {
    await mongoose.connect(process.env.MONGO_URI!, {})
}

export async function teardownTestDb() {
    await mongoose.connection.close()
}
