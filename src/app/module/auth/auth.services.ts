import {
	Role,
	User,
	UserStatus
} from '../../../../generated/prisma/client/client'
import { auth } from '../../lib/auth'
import { prisma } from '../../lib/prisma'

const registerPatient = async (payload: User & { password: string }) => {
	const { name, email, password } = payload
	const data = await auth.api.signUpEmail({
		body: {
			name,
			email,
			password
			//* this value have default value so you can skip it also
			// needPasswordChange: false,
			// role: Role.PATIENT
		}
	})
	if (!data.user) {
		throw new Error('Failed to Register')
	}
	const patient = await prisma.$transaction(async (tx) => {
		const patientTx = await tx.patient.create({
			data: {
				userId: data.user.id,
				name,
				email
			}
		})
		return patientTx
	})
	return { ...data, patient }
}

const loginUser = async (payload: User & { password: string }) => {
	const { email, password } = payload
	const data = await auth.api.signInEmail({
		body: {
			email,
			password
		}
	})
	if (!data.user) {
		throw new Error('Failed to Login')
	}
	if (data.user.status !== UserStatus.ACTIVE) {
		throw new Error('User is not active')
	}
	if (data.user.isDeleted) {
		throw new Error('User is deleted')
	}
	return data
}

export const AuthService = {
	registerPatient,
	loginUser
}
