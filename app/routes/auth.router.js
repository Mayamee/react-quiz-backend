import { Router } from "express";
import { body } from "express-validator";
import AuthController from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/activate/:link", AuthController.activate);
router.get("/refresh", AuthController.refresh);

export default router;
