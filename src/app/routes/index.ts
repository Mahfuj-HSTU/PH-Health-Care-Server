import { Router } from 'express'
import { SpecialtyRoutes } from '../module/specialty/specialty.routes'
import { AuthRoutes } from '../module/auth/auth.routes'
import { UserRoutes } from '../module/user/user.route'

const router = Router()

router.use('/auth', AuthRoutes)
router.use('/specialties', SpecialtyRoutes)
router.use('/doctors', UserRoutes)

export const routes = router
