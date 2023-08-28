import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

let mongod: MongoMemoryServer

export default async function setupTestDb() {
    mongod = await MongoMemoryServer.create()
    const uri = mongod.getUri()
    process.env.MONGO_URI = uri

    await mongoose.connect(uri, {})
}

export async function teardownTestDb() {
    await mongoose.connection.close()
    await mongod.stop()
}
