import { SpecialtyController } from './specialty.controllers'
import express from 'express'

const router = express.Router()

router.post('/', SpecialtyController.createSpecialty)
router.get('/', SpecialtyController.getAllSpecialties)
router.delete('/:id', SpecialtyController.deleteSpecialty)

export const SpecialtyRoutes = router
