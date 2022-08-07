import QuizModel from "../models/QuizModel.js";
import QuizDTO from "../dtos/QuizDTO.js";

class QuizService {
  async getQuizes() {
    const quizesData = await QuizModel.find();
    return quizesData.map((quiz) => new QuizDTO(quiz));
  }
  async addQuiz(body) {
    const quiz = await QuizModel.create({
      title: body.title,
      body: body.body,
    });
    return await quiz.save();
  }
  async getQuizById() {}
  async updateQuizByHash() {}
  async deleteQuizByHash() {}
}
export default new QuizService();
