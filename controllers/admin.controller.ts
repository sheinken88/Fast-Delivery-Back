// import { type Request, type Response } from 'express'
// import { getAllAdmins, createAdmin } from '../services/admin.services'

// export const get_all_admins = async (_req: Request, res: Response) => {
//     try {
//         const admins = await getAllAdmins()
//         res.status(200).send(admins)
//     } catch (error) {
//         console.error('Error fetching admins:', error)
//         res.sendStatus(500)
//     }
// }

// export const create_admin = async (req: Request, res: Response) => {
//     try {
//         const newAdmin = await createAdmin(req.body)
//         res.status(200).send(newAdmin)
//     } catch (error) {
//         console.error('Error creating admin:', error)
//         res.sendStatus(500)
//     }
// }
