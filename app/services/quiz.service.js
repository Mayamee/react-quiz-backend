import QuizModel from "../models/QuizModel.js";

class QuizService {
  async getQuizes() {
    return await QuizModel.find({});
  }
  async addQuiz(body) {
    const quiz = await QuizModel.create({
      title: body.title,
      body: body.body,
    });
    return await quiz.save();
  }
  async getQuizByHash() {}
  async updateQuizByHash() {}
  async deleteQuizByHash() {}
}
export default new QuizService();
