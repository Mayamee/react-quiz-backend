import UserService from "../services/User.service.js";
import { validationResult } from "express-validator";
import ApiError from "../error/ApiError.js";
class AuthController {
  async registration(req, res, next) {
    try {
      // Проверяем валидацию данных пролученных от клиента
      const { email, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw ApiError.BadRequest("Ошибка валидации", errors.array());
      }
      // Отправляем данные на сервис для регистрации
      const userData = await UserService.registration(email, password);
      // Создаем http куки для авторизации пользователя
      res.cookie("refreshToken", userData.refreshToken, {
        httpOnly: true,
        maxAge: 2592000000,
      });
      // Возвращаем данные пользователя в ответе
      return res.status(201).json(userData);
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      // Получаем данные для аутентификации от клиента
      const { email, password } = req.body;
      // Отправляем данные на сервис для аутентификации
      const userData = await UserService.login(email, password);
      // Создаем http куки для авторизации пользователя
      res.cookie("refreshToken", userData.refreshToken, {
        httpOnly: true,
        maxAge: 2592000000,
      });
      // Возвращаем данные пользователя в ответе
      return res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      // Получаем токен обновления для авторизации пользователя
      const { refreshToken } = req.cookies;
      // Отправляем данные на сервис для удаления токена обновления
      const token = await UserService.logout(refreshToken);
      // Удаляем куки авторизации пользователя
      res.clearCookie("refreshToken");
      // Возвращаем токен в ответе
      return res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }
  async activate(req, res, next) {}
  async refresh(req, res, next) {
    try {
      // Получаем токен обновления для обновления авторизации пользователя
      const { refreshToken } = req.cookies;
      // Отправляем данные на сервис для обновления авторизации
      const userData = await UserService.refresh(refreshToken);
      // Создаем http куки для авторизации пользователя
      res.cookie("refreshToken", userData.refreshToken, {
        httpOnly: true,
        maxAge: 2592000000,
      });
      // Возвращаем данные пользователя в ответе
      return res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }
}
export default new AuthController();
