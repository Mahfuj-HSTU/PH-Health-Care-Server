import express, { Application, Request, Response } from 'express'
import { routes } from './app/routes'

const app: Application = express()
// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }))

// Middleware to parse JSON bodies
app.use(express.json())

// app.all('/api/auth/{*any}', toNodeHandler(auth))
app.use('/api/v1', routes)

// Basic route
app.get('/', (req: Request, res: Response) => {
	res.send('Hello, TypeScript + Express!')
})

export default app
