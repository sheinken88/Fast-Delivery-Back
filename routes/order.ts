import express from 'express'
import { get_all_orders, create_order } from '../controllers/order.controller'
const orderRouter = express.Router()

orderRouter.get('/', get_all_orders)
orderRouter.post('/', create_order)

export default orderRouter
