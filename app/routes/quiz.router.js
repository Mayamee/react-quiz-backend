import { Router } from "express";
import quizController from "../controllers/quiz.controller.js";
import validateQuizObjectMiddleware from "../middleware/validateQuizObject.middleware.js";
import validateQuizIdMiddleware from "../middleware/validateQuizId.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", quizController.getQuizes);
router.post(
  "/",
  //TODO authMiddleware,
  validateQuizObjectMiddleware,
  quizController.addQuiz
);
router.get("/:id", validateQuizIdMiddleware, quizController.getQuizById);
router.put("/:id", quizController.updateQuizById);
router.delete("/:id", quizController.deleteQuizById);

export default router;
