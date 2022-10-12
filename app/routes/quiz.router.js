import { Router } from 'express'
import quizController from '../controllers/quiz.controller.js'
import validateQuizObjectMiddleware from '../middleware/validateQuizObject.middleware.js'
import validateQuizIdMiddleware from '../middleware/validateQuizId.middleware.js'
import authMiddleware from '../middleware/auth.middleware.js'
import { loggerMiddleware } from '../middleware/logger.middleware.js'
import upload from '../middleware/multer.middleware.js'

const router = Router()

router.get('/', quizController.getQuizes)
router.post('/', authMiddleware, upload.single('logo'), quizController.addQuiz)
router.get('/my', authMiddleware, quizController.getQuizesByUserId)
router.get('/:id', validateQuizIdMiddleware, quizController.getQuizById)
router.put('/:id', quizController.updateQuizById)
router.delete('/:id', authMiddleware, quizController.deleteQuizById)

export default router
