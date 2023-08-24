import { Driver } from '../models'

export const getAllDrivers = async () => {
    try {
        const drivers = await Driver.find()
        return drivers
    } catch (error) {
        console.log('getAllDrivers service error', error)
        throw error
    }
}

export const signupDriver = async (data: object) => {
    try {
        const newDriver = new Driver(data)
        console.log('newDriver', newDriver)
        await newDriver.save()
        return newDriver
    } catch (error) {
        console.log('signupDriver service error', error)
        throw error
    }
}
