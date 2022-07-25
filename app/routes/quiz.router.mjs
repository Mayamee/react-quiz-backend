import { Router } from "express";
import quizController from "../controllers/quiz.controller.mjs";
const router = Router();

router.get("/quiz", quizController.getQuizzes);
router.get("/quiz/:hashsum", quizController.getQuizByHash);
router.post("/quiz", quizController.saveQuiz);
router.put("/quiz/:hashsum", quizController.updateQuizByHash);
router.delete("/quiz/:hashsum", quizController.deleteQuizByHash);

export default router;
