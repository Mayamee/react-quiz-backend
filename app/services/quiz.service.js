import QuizModel from "../models/QuizModel.js";

import QuizDTO from "../dtos/QuizDTO.js";
import ApiError from "../error/ApiError.js";
import pkg from "mongoose";
const { isValidObjectId } = pkg;

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
  async getQuizesByUserId(id) {
    if (!isValidObjectId(id)) {
      throw ApiError.BadRequest("Incorrect ObjectId");
    }
    const quizesData = await QuizModel.find({
      "ownerInfo.userId": id,
    });
    return quizesData.map((quiz) => new QuizDTO(quiz));
  }
  async updateQuizByHash() {}
  async deleteQuizByHash() {}
}
export default new QuizService();
