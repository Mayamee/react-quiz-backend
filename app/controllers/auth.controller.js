import UserService from "../services/User.service.js";
import { validationResult } from "express-validator";
import ApiError from "../error/ApiError.js";
class AuthController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw ApiError.BadRequest("Ошибка валидации", errors.array());
      }
      const user = await UserService.registration(email, password);
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {}
  async logout(req, res, next) {}
  async activate(req, res, next) {}
  async refresh(req, res, next) {}
}
export default new AuthController();
