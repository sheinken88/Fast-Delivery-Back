import express from 'express'
import adminRouter from './admin'
import driverRouter from './driver'
import packageRouter from './package'
import orderRouter from './order'
import statementRouter from './statement'

const router = express.Router()

router.use('/admins', adminRouter)
router.use('/drivers', driverRouter)
router.use('/packages', packageRouter)
router.use('/orders', orderRouter)
router.use('/statements', statementRouter)

export default router
