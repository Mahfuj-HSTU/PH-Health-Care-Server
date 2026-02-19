import { Request, Response } from 'express'
import status from 'http-status'
import { DoctorService } from './doctor.service'
import catchAsync from '../../helper/catchAsync'
import sendResponse from '../../helper/sendResponse'

const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
	const result = await DoctorService.getAllDoctors()

	sendResponse(res, {
		httpStatuscode: status.OK,
		success: true,
		message: 'Doctors fetched successfully',
		data: result
	})
})

const getDoctorById = catchAsync(async (req: Request, res: Response) => {
	const result = await DoctorService.getDoctorById(req.params.id)

	sendResponse(res, {
		httpStatuscode: status.OK,
		success: true,
		message: 'Doctor fetched successfully',
		data: result
	})
})

//const updateDoctor = catchAsync(
//const deleteDoctor = catchAsync(

export const DoctorController = {
	getAllDoctors,
	getDoctorById
	// updateDoctor,
	// deleteDoctor,
}
