import { prisma } from '../../lib/prisma'

const getAllDoctors = async () => {
	const doctors = await prisma.doctor.findMany({
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
			id
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

// const updateDoctor = async (id: string, payload: IUpdateDoctorPayload) => {}

// const deleteDoctor = async (id: string) => {} //soft delete

export const DoctorService = {
	getAllDoctors,
	getDoctorById
}
