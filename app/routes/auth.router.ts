import { Router } from 'express'
import { body } from 'express-validator'
import AuthController from '../controllers/auth.controller'
const router = Router()

router
  .post(
    '/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 32 }),
    AuthController.registration
  )
  .post('/login', AuthController.login)
  .get('/logout', AuthController.logout)
  .get('/activate/:link', AuthController.activate)
  .get('/refresh', AuthController.refresh)

export default router
