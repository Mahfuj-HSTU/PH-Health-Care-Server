import express from 'express'
import { AuthController } from './auth.controller'

const router = express.Router()

router.post('/register', AuthController.registerPatient)

export const AuthRoutes = router
