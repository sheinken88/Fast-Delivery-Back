import express from 'express'
// import userRouter from './user'
// import adminRouter from './admin'
import driverRouter from './driver'
import packageRouter from './package'

const router = express.Router()

// router.use('/users', userRouter)
// router.use('/admins', adminRouter)
router.use('/drivers', driverRouter)
router.use('/packages', packageRouter)

export default router
