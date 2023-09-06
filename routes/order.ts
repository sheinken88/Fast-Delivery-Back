import express from 'express'
import {
    get_all_orders,
    create_order,
    get_orders_by_driver,
    get_order_by_id,
    complete_order,
    cancel_order,
} from '../controllers/order.controller'
const orderRouter = express.Router()

orderRouter.get('/', get_all_orders)
orderRouter.get('/driver/:id', get_orders_by_driver)
orderRouter.get('/:id', get_order_by_id)
orderRouter.post('/', create_order)
orderRouter.put('/complete/:id', complete_order)
orderRouter.put('/cancel/:id', cancel_order)

export default orderRouter
