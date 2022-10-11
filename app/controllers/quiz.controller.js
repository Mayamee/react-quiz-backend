import QuizService from '../services/Quiz.service.js'
class QuizController {
  async getQuizes(_req, res, next) {
    try {
      const quizesData = await QuizService.getQuizes()
      return res.status(200).json({ status: 200, data: quizesData })
    } catch (error) {
      next(error)
    }
  }
  async addQuiz(req, res, next) {
    try {
      const { title, body, ownerInfo } = req.body
      const info = await QuizService.addQuiz(title, body, ownerInfo)
      return res.status(200).json({ status: 200, data: info.status })
    } catch (error) {
      next(error)
    }
  }
  async getQuizById(req, res, next) {
    try {
      const { id } = req.params
      const quiz = await QuizService.getQuizById(id)
      return res.status(200).json({ status: 200, data: quiz })
    } catch (error) {
      next(error)
    }
  }
  async getQuizesByUserId(req, res, next) {
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
  async updateQuizById(req, res, next) {
    try {
    } catch (error) {}
  }
  async deleteQuizById(req, res, next) {
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
