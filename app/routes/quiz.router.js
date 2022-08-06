import { Router } from "express";
import quizController from "../controllers/quiz.controller.js";
import validateQuizObjectMiddleware from "../middleware/validateQuizObject.middleware.js";
const router = Router();

router.get("/quiz", quizController.getQuizes);
router.get("/quiz/:hashsum", quizController.getQuizByHash);
router.post("/quiz", validateQuizObjectMiddleware, quizController.addQuiz);
router.put("/quiz/:hashsum", quizController.updateQuizByHash);
router.delete("/quiz/:hashsum", quizController.deleteQuizByHash);

export default router;
