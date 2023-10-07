import { generateToken } from '../config/token'
import type { IToken } from '../interfaces/token'
import { Driver } from '../models'

export const getAllDrivers = async () => {
    try {
        const drivers = await Driver.find()
        return drivers
    } catch (error) {
        console.error('getAllDrivers service error', error)
        throw error
    }
}

export const getActiveDrivers = async () => {
    try {
        const drivers = await Driver.find({ status: true })
        return drivers
    } catch (error) {
        console.error('getActiveDrivers service error', error)
        throw error
    }
}

export const signupDriver = async (data: object) => {
    try {
        const newDriver = new Driver(data)
        await newDriver.save()
        return newDriver
    } catch (error) {
        console.error('signupDriver service error', error)
        throw error
    }
}

export const loginDriver = async (data: IToken) => {
    try {
        const token = generateToken(data)
        return token
    } catch (error) {
        console.error('signupDriver service error', error)
        throw error
    }
}

export const updateDriverProfile = async (id: string, data: object) => {
    try {
        const updatedDriver = await Driver.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        })
        return updatedDriver
    } catch (error) {
        console.error('updateDriverProfile service error', error)
        throw error
    }
}
