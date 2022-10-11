import { Router } from 'express'
import { body } from 'express-validator'
import AuthController from '../controllers/auth.controller.js'
import testMiddleware from '../middleware/test.middleware.js'
const router = Router()

router.post(
  '/registration',
  testMiddleware,
  body('email').isEmail(),
  body('password').isLength({ min: 6, max: 32 }),
  AuthController.registration
)
router.post('/login', AuthController.login)
router.get('/logout', AuthController.logout)
router.get('/activate/:link', AuthController.activate)
router.get('/refresh', AuthController.refresh)

export default router
