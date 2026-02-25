import type { NextFunction, Request, Response } from 'express'
import { error } from 'node:console'
import { Prisma } from '../../../generated/prisma/client'
import z from 'zod'
import { TErrorSources } from '../interfaces/error.interfaces'
import { handleZodError } from '../errorHelpers/handleZodError'

function globalErrorHandler(
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) {
	let statusCode = 500
	let errormessage = 'Internal Server Error'
	let errorDetails = err
	const errorSource: TErrorSources[] = []

	if (err instanceof z.ZodError) {
		const simplifiedError = handleZodError(err)
		statusCode = simplifiedError.statusCode
		errormessage = simplifiedError.message
		// err.issues.forEach((issue: any) => {
		// 	errorSource.push({
		// 		path: issue.path.join('.'),
		// 		message: issue.message
		// 	})
		// })
		errorSource.push(...simplifiedError.errorSources)
	}

	// *prisma validation error
	if (err instanceof Prisma.PrismaClientValidationError) {
		statusCode = 400
		errormessage = 'You have made an invalid request to the database.'
	} else if (err instanceof Prisma.PrismaClientKnownRequestError) {
		// *prisma known error
		if (err.code === 'P2002') {
			statusCode = 409
			errormessage = 'Unique constraint failed.'
		} else if (err.code === 'P2025') {
			statusCode = 404
			errormessage = 'The requested record was not found.'
		} else if (err.code === 'P2003') {
			statusCode = 400
			errormessage = 'Foreign key constraint failed.'
		}
	} else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
		statusCode = 500
		errormessage = 'An unknown error occurred with the database client.'
	} else if (err instanceof Prisma.PrismaClientRustPanicError) {
		statusCode = 500
		errormessage = 'A panic occurred in the Prisma Client Rust engine.'
	} else if (err instanceof Prisma.PrismaClientInitializationError) {
		if (err.errorCode === 'P1000') {
			statusCode = 401
			errormessage = 'Authentication failed against the database.'
		} else if (err.errorCode === 'P1001') {
			statusCode = 503
			errormessage = 'The database server is not available.'
		} else if (err.errorCode === 'P1002') {
			statusCode = 503
			errormessage = 'The database timed out while trying to connect.'
		} else {
			statusCode = 500
			errormessage =
				'An error occurred during the initialization of the Prisma Client.'
		}
	}
	res.status(statusCode)
	res.json({
		success: false,
		message: errormessage,
		stack: errorSource,
		error: errorDetails.message
	})
}

export default globalErrorHandler
