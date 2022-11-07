import { Router } from 'express'
import quizController from '../controllers/quiz.controller'
import validateQuizIdMiddleware from '../middleware/validateQuizId.middleware'
import authMiddleware from '../middleware/auth.middleware'
import upload from '../middleware/multer.middleware'

const router = Router()

router
  .use(authMiddleware)
  .get('/', quizController.getQuizes)
  .post('/', upload.single('logo'), quizController.addQuiz)
  .get('/my', quizController.getQuizesByUserId)
  .get('/:id', validateQuizIdMiddleware, quizController.getQuizById)
  .put('/:id', quizController.updateQuizById)
  .delete('/:id', quizController.deleteQuizById)

export default router
