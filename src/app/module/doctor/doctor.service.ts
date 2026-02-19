import { prisma } from '../../lib/prisma'
import { IUpdateDoctorPayload } from './doctor.interface'

const getAllDoctors = async () => {
	const doctors = await prisma.doctor.findMany({
		where: {
			deletedAt: null
		},
		include: {
			user: true,
			specialties: {
				include: {
					specialty: true
				}
			}
		}
	})
	return doctors
}

const getDoctorById = async (id: string) => {
	const doctor = await prisma.doctor.findUnique({
		where: {
			id,
			deletedAt: null
		},
		include: {
			user: true,
			specialties: {
				include: {
					specialty: true
				}
			}
		}
	})
	return doctor
}

const updateDoctor = async (id: string, payload: IUpdateDoctorPayload) => {
	const result = await prisma.doctor.update({
		where: {
			id
		},
		data: payload
	})
	return result
}

const deleteDoctor = async (id: string) => {
	const result = await prisma.doctor.update({
		where: { id },
		data: {
			deletedAt: new Date()
		}
	})

	return result
}

export const DoctorService = {
	getAllDoctors,
	getDoctorById,
	updateDoctor,
	deleteDoctor
}
