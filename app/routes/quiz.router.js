import { Router } from 'express'
import quizController from '#app/controllers/quiz.controller'
import validateQuizIdMiddleware from '#app/middleware/validateQuizId.middleware'
import authMiddleware from '#app/middleware/auth.middleware'
import upload from '#app/middleware/multer.middleware'

const router = Router()

router.get('/', quizController.getQuizes)
router.post('/', authMiddleware, upload.single('logo'), quizController.addQuiz)
router.get('/my', authMiddleware, quizController.getQuizesByUserId)
router.get('/:id', validateQuizIdMiddleware, quizController.getQuizById)
router.delete('/:id', authMiddleware, quizController.deleteQuizById)

export default router
