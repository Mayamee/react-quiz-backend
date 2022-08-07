import { Router } from "express";
import quizController from "../controllers/quiz.controller.js";
import validateQuizObjectMiddleware from "../middleware/validateQuizObject.middleware.js";
import validateQuizIdMiddleware from "../middleware/validateQuizId.middleware.js";
const router = Router();

router.get("/quiz", quizController.getQuizes);
router.post("/quiz", validateQuizObjectMiddleware, quizController.addQuiz);
router.get("/quiz/:id", validateQuizIdMiddleware, quizController.getQuizById);
router.put("/quiz/:id", quizController.updateQuizById);
router.delete("/quiz/:id", quizController.deleteQuizById);

export default router;
