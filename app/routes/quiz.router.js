import { Router } from 'express'
import quizController from '../controllers/quiz.controller'
import validateQuizObjectMiddleware from '../middleware/validateQuizObject.middleware'
import validateQuizIdMiddleware from '../middleware/validateQuizId.middleware'
import authMiddleware from '../middleware/auth.middleware'
import upload from '../middleware/multer.middleware'

const router = Router()

router.get('/', quizController.getQuizes)
router.post('/', authMiddleware, upload.single('logo'), quizController.addQuiz)
router.get('/my', authMiddleware, quizController.getQuizesByUserId)
router.get('/:id', validateQuizIdMiddleware, quizController.getQuizById)
router.put('/:id', quizController.updateQuizById)
router.delete('/:id', authMiddleware, quizController.deleteQuizById)

export default router
