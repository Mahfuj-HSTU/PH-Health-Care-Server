import catchAsync from '../../helper/catchAsync'
import sendResponse from '../../helper/sendResponse'
import { AuthService } from './auth.services'

const registerPatient = catchAsync(async (req, res, next) => {
	const user = await AuthService.registerPatient(req.body)
	sendResponse(res, {
		httpStatuscode: 200,
		success: true,
		message: 'User created successfully',
		data: user
	})
})

export const AuthController = {
	registerPatient
}
