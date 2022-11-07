import { Request, Response, NextFunction } from 'express'
import ApiError from '../error/ApiError'
import QuizService from '../services/QuizWorker.service'
import { IAddQuizRequest } from '../types/controllers/quiz-controller.types'
import { IAuthRequest } from '../types/middleware/middleware.types'
import { IQuizBodyItem } from '../types/services/quiz-service.types'
class QuizController {
  async getQuizes(req: Request, res: Response, next: NextFunction) {
    try {
      const quizesData = await QuizService.getQuizes()
      return res.status(200).json({ status: 200, data: quizesData })
    } catch (error) {
      next(error)
    }
  }
  async addQuiz(req: IAddQuizRequest, res: Response, next: NextFunction) {
    try {
      const {
        body: { title, body },
        user: { id, username },
        file,
      } = req
      if (!title || !body || !id || !username) {
        throw ApiError.BadRequest('Incorrect data')
      }
      const quizData = {
        quizTitle: title,
        quizBody: JSON.parse(body) as IQuizBodyItem[],
        quizOwnerInfo: {
          userId: id,
          name: username,
        },
        logoPath: file ? file.path : null,
      }
      await QuizService.addQuiz(quizData)
      return res.status(200).json({ status: 200, data: 'Success' })
    } catch (error) {
      next(error)
    }
  }
  async getQuizById(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        params: { id },
      } = req
      const quiz = await QuizService.getQuizById(id)
      return res.status(200).json({ status: 200, data: quiz })
    } catch (error) {
      next(error)
    }
  }
  async getQuizesByUserId(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const {
        user: { id },
      } = req
      const quizesData = await QuizService.getQuizesByUserId(id)
      return res.status(200).json({ status: 200, data: quizesData })
    } catch (error) {
      next(error)
    }
  }
  async updateQuizById(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {}
  }
  async deleteQuizById(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        params: { id },
        user: { id: userId },
      } = req
      await QuizService.checkQuizOwner(id, userId)
      const quizData = await QuizService.deleteQuizById(id)
      return res.status(200).json({ status: 200, data: quizData })
    } catch (error) {
      next(error)
    }
  }
}

export default new QuizController()
