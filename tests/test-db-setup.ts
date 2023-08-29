// import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export default async function setupTestDb() {
    // mongod = await MongoMemoryServer.create()
    // const uri = mongod.getUri()
    // process.env.MONGO_URI = uri

    await mongoose.connect(process.env.MONGO_URI!, {})
}

export async function teardownTestDb() {
    await mongoose.connection.close()
}
