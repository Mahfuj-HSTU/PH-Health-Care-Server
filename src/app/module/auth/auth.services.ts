import { Role, User } from '../../../../generated/prisma/client/client'
import { auth } from '../../lib/auth'
import { prisma } from '../../lib/prisma'

const registerPatient = async (payload: User) => {
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
	// const patient = await prisma.$transaction(async(tx)=>{
	//   const patient = await tx.patient.create({
	//     data: {
	//       name,
	//       email,
	//       password,
	//       needPasswordChange: false,
	//       role: Role.PATIENT
	//     }
	//   })
	//   return patient
	// })
	return data.user
}

export const AuthService = {
	registerPatient
}
