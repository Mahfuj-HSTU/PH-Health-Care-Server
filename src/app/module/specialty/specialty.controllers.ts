import { Request, Response } from 'express'
import { SpecialtyService } from './specialty.services'
import catchAsync from '../../lib/catchAsync'

const createSpecialty = catchAsync(async (req: Request, res: Response) => {
	const result = await SpecialtyService.createSpecialty(req.body)
	res.status(200).json({
		success: true,
		message: 'Specialty created successfully',
		data: result
	})
})

const getAllSpecialties = catchAsync(async (req: Request, res: Response) => {
	const result = await SpecialtyService.getAllSpecialties()
	res.status(200).json({
		success: true,
		message: 'Specialties fetched successfully',
		data: result
	})
})
const updateSpecialty = catchAsync(async (req: Request, res: Response) => {
	const result = await SpecialtyService.updateSpecialty(
		req.params.id as string,
		req.body
	)
	res.status(200).json({
		success: true,
		message: 'Specialty updated successfully',
		data: result
	})
})

const getSingleSpecialty = catchAsync(async (req: Request, res: Response) => {
	const result = await SpecialtyService.getSingleSpecialty(
		req.params.id as string
	)
	res.status(200).json({
		success: true,
		message: 'Specialty fetched successfully',
		data: result
	})
})

const deleteSpecialty = catchAsync(async (req: Request, res: Response) => {
	const result = await SpecialtyService.deleteSpecialty(req.params.id as string)
	res.status(200).json({
		success: true,
		message: 'Specialty deleted successfully',
		data: result
	})
})

export const SpecialtyController = {
	createSpecialty,
	getAllSpecialties,
	updateSpecialty,
	getSingleSpecialty,
	deleteSpecialty
}
