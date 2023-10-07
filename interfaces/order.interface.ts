import type IDriver from './driver.interface'
import type IPackage from './package.interface'

export default interface IOrder {
    status: string
    driver: IDriver
    packages: IPackage[]
    date: Date
}
