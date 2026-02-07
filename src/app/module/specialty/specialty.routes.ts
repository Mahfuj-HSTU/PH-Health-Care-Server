import { SpecialtyController } from './specialty.controllers'
import express from 'express'

const router = express.Router()

router
	.post('/', SpecialtyController.createSpecialty)
	.get('/', SpecialtyController.getAllSpecialties)
	.get('/:id', SpecialtyController.getSingleSpecialty)
	.patch('/:id', SpecialtyController.updateSpecialty)
	.delete('/:id', SpecialtyController.deleteSpecialty)

export const SpecialtyRoutes = router
