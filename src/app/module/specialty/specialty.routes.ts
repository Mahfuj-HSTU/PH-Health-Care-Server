import { SpecialtyController } from './specialty.controllers'
import express from 'express'

const router = express.Router()

router.post('/', SpecialtyController.createSpecialty)

export const SpecialtyRoutes = router
