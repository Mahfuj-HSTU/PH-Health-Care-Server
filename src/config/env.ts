import dotenv from 'dotenv'

dotenv.config()

interface EnvConfig {
	PORT: number
	NODE_ENV: string
	DATABASE_URL: string
	BETTER_AUTH_SECRET: string
	BETTER_AUTH_URL: string
}

const envConfig = (): EnvConfig => {
	const requiredEnvVariables = [
		'PORT',
		'NODE_ENV',
		'DATABASE_URL',
		'BETTER_AUTH_SECRET',
		'BETTER_AUTH_URL'
	]
	requiredEnvVariables.forEach((envVar) => {
		if (!process.env[envVar]) {
			throw new Error(`Environment variable ${envVar} is required`)
		}
	})
	return {
		PORT: parseInt(process.env.PORT || '5000'),
		NODE_ENV: process.env.NODE_ENV || 'development',
		DATABASE_URL: process.env.DATABASE_URL || '',
		BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET || '',
		BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || ''
	}
}

export const envVariables = envConfig()
