import QuizModel from "../models/QuizModel.js";

import QuizDTO from "../dtos/QuizDTO.js";
import ApiError from "../error/ApiError.js";

class QuizService {
  async getQuizes() {
    const quizesData = await QuizModel.find();
    return quizesData.map((quiz) => new QuizDTO(quiz));
  }
  async addQuiz(title, body, ownerInfo) {
    const quiz = await QuizModel.create({
      title,
      body,
      ownerInfo,
    });
    return await quiz.save();
  }
  async getQuizById(id) {
    const quiz = await QuizModel.findById(id);
    if (quiz === null) {
      throw ApiError.NotFound("Quiz not found");
    }
    return new QuizDTO(quiz);
  }
  async updateQuizByHash() {}
  async deleteQuizByHash() {}
}
export default new QuizService();
