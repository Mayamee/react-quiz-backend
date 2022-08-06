import QuizModel from "../models/QuizModel.js";
import { v5 } from "uuid";

class QuizService {
  async getQuizes() {
    return await QuizModel.find({});
  }
  async addQuiz(body) {
    const quiz = new QuizModel({
      title: body.title,
      uuid: v5(body.title, "quiz"),
      body: body.body,
    });
    return await quiz.save();
  }
  async getQuizByHash() {}
  async updateQuizByHash() {}
  async deleteQuizByHash() {}
}
export default new QuizService();
