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
  async updateQuizById() {}
  async checkQuizOwner(id, userId) {
    if (!isValidObjectId(id)) {
      throw ApiError.BadRequest("Incorrect Quiz Id");
    }
    if (!isValidObjectId(userId)) {
      throw ApiError.BadRequest("Incorrect User Id");
    }
    //todo может быть лишним
    const quiz = await QuizModel.findById(id);
    if (quiz === null) {
      throw ApiError.NotFound("Quiz not found");
    }
    if (quiz.ownerInfo.userId.toString() !== userId) {
      throw ApiError.Forbidden("You are not the owner of this quiz");
    }
  }
  async deleteQuizById(id) {
    const quiz = await QuizModel.deleteOne({ _id: id });
    if (quiz.deletedCount === 0) {
      throw ApiError.NotFound("Quiz not found");
    }
    return quiz;
  }
}
export default new QuizService();
