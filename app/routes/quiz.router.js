import { Router } from "express";
import quizController from "../controllers/quiz.controller.js";
import validateQuizObjectMiddleware from "../middleware/validateQuizObject.middleware.js";
import validateQuizId from "../middleware/validateQuizId.middleware.js";
const router = Router();

router.get("/quiz", quizController.getQuizes);
router.post("/quiz", validateQuizObjectMiddleware, quizController.addQuiz);
router.get("/quiz/:id", validateQuizId, quizController.getQuizById);
router.put("/quiz/:hashsum", quizController.updateQuizById);
router.delete("/quiz/:hashsum", quizController.deleteQuizById);

export default router;
