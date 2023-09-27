import express from 'express'
import {
    get_all_orders,
    create_order,
    get_orders_by_driver,
    get_order_by_id,
    complete_order,
    cancel_order,
    get_driver_current_order,
    add_packages_to_delivery,
} from '../controllers/order.controller'
import { validateUser } from '../middlewares/auth'
const orderRouter = express.Router()

orderRouter.get('/', validateUser, get_all_orders)
orderRouter.get('/driver/:id', validateUser, get_orders_by_driver)
orderRouter.get('/driver/current/:id', validateUser, get_driver_current_order)
orderRouter.get('/:id', validateUser, get_order_by_id)
orderRouter.post('/', validateUser, create_order)
orderRouter.put('/add-packages/:id', validateUser, add_packages_to_delivery)
orderRouter.put('/complete/:id', validateUser, complete_order)
orderRouter.put('/cancel/:id', validateUser, cancel_order)

export default orderRouter
