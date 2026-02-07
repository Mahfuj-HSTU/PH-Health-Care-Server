import { Response } from 'express'

interface TResponseData<T> {
	httpStatuscode: number
	success: boolean
	message: string
	data?: T
}

const sendResponse = <T>(res: Response, responseData: TResponseData<T>) => {
	const { httpStatuscode, success, message, data } = responseData
	res.status(httpStatuscode).json({
		success,
		message,
		data
	})
}

export default sendResponse
