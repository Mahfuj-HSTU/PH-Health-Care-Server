import { Request, Response } from 'express'
import { SpecialtyService } from './specialty.services'

const createSpecialty = async (req: Request, res: Response) => {
	try {
		const result = await SpecialtyService.createSpecialty(req.body)
		res.status(200).json({
			success: true,
			message: 'Specialty created successfully',
			data: result
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Failed to create specialty',
			error: error
		})
	}
}

const getAllSpecialties = async (req: Request, res: Response) => {
	try {
		const result = await SpecialtyService.getAllSpecialties()
		res.status(200).json({
			success: true,
			message: 'Specialties fetched successfully',
			data: result
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Failed to fetch specialties',
			error: error
		})
	}
}

const updateSpecialty = async (req: Request, res: Response) => {
	try {
		const result = await SpecialtyService.updateSpecialty(
			req.params.id as string,
			req.body
		)
		res.status(200).json({
			success: true,
			message: 'Specialty updated successfully',
			data: result
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Failed to update specialty',
			error: error
		})
	}
}

const getSingleSpecialty = async (req: Request, res: Response) => {
	try {
		const result = await SpecialtyService.getSingleSpecialty(
			req.params.id as string
		)
		res.status(200).json({
			success: true,
			message: 'Specialty fetched successfully',
			data: result
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Failed to fetch specialty',
			error: error
		})
	}
}

const deleteSpecialty = async (req: Request, res: Response) => {
	try {
		const result = await SpecialtyService.deleteSpecialty(
			req.params.id as string
		)
		res.status(200).json({
			success: true,
			message: 'Specialty deleted successfully',
			data: result
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Failed to delete specialty',
			error: error
		})
	}
}

export const SpecialtyController = {
	createSpecialty,
	getAllSpecialties,
	updateSpecialty,
	getSingleSpecialty,
	deleteSpecialty
}
