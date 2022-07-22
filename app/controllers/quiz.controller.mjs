import db from "../database/connect.mjs";
import MD5 from "crypto-js/md5.js";

class QuizController {
  async getQuizzes(req, res) {
    try {
      const quizzes = await db.query("SELECT * FROM quizes");
      res.status(200).json({ data: quizzes.rows });
    } catch (error) {
      res.status(500).json({ data: "Something went wrong" });
    }
  }
  async saveQuiz(req, res) {
    try {
      const body = req.body;
      if (Object.keys(body).length === 0) {
        return res.status(400).json({ data: "No data provided" });
      }
      const query = await db.query(
        "INSERT INTO quizes (info, hashsum) VALUES ($1, $2) RETURNING *",
        [JSON.stringify(body), MD5(JSON.stringify(body)).toString()]
      );
      res.status(200).json({ query: query.rows[0] });
    } catch (error) {
      if (error.code === "23505") {
        res.status(400).json({ data: "Quiz already exists" });
      } else {
        res.status(500).json({ data: "Something went wrong" });
      }
    }
  }
  async updateQuizByHash(req, res) {
    try {
      const body = req.body;
      const hashsum = req.params.hashsum;
      if (Object.keys(body).length === 0) {
        return res.status(400).json({ data: "No data provided" });
      }
      const query = await db.query(
        "UPDATE quizes SET info = $1, hashsum = $2 WHERE hashsum = $3 RETURNING *",
        [JSON.stringify(body), MD5(JSON.stringify(body)).toString(), hashsum]
      );
      if (query.rowCount === 0) {
        return res.status(404).json({ data: "Quiz not found" });
      }
      res.status(200).json({ query: query.rows[0] });
    } catch (error) {
      res.status(500).json({ data: "Something went wrong" });
    }
  }
  async deleteQuizByHash(req, res) {
    try {
      const hashsum = req.params.hashsum;
      if (!hashsum) {
        return res.status(400).json({ data: "No hashsum provided" });
      }
      const query = await db.query("DELETE FROM quizes WHERE hashsum = $1", [
        hashsum,
      ]);
      if (query.rowCount === 0) {
        return res.status(400).json({ data: "Quiz not found" });
      }
      res
        .status(200)
        .json({ data: `Quiz with hash ${hashsum} has been deleted` });
    } catch (error) {
      res.status(500).json({ data: "Something went wrong" });
    }
  }
}

export default new QuizController();
