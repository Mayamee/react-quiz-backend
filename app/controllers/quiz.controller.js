import QuizService from "../services/Quiz.service.js";
class QuizController {
  async getQuizes(_req, res, next) {
    try {
      const quizesData = await QuizService.getQuizes();
      return res.status(200).json({ status: 200, data: quizesData });
    } catch (error) {
      next(error);
    }
  }
  async addQuiz(req, res, next) {
    try {
      const body = req.body;
      const someInfo = await QuizService.addQuiz(body);
      return res.status(200).json({ status: 200, data: someInfo.status });
    } catch (error) {
      next(error);
    }
  }
  async getQuizById(req, res, next) {
    try {
      const { id } = req.params;
      const quiz = await QuizService.getQuizById(id);
      return res.status(200).json({ status: 200, data: quiz });
    } catch (error) {
      next(error);
    }
  }

  async updateQuizById(req, res, next) {
    try {
    } catch (error) {}
  }
  async deleteQuizById(req, res, next) {
    try {
    } catch (error) {}
  }
}

export default new QuizController();
