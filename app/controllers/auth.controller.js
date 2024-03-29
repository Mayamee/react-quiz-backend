import { validationResult } from 'express-validator'
import UserService from '#app/services/User.service'
import ApiError from '#app/error/ApiError'
class AuthController {
  async registration(req, res, next) {
    try {
      // Проверяем валидацию данных пролученных от клиента
      const { email, username, password } = req.body
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        throw ApiError.BadRequest('Ошибка валидации', errors.array())
      }
      // Отправляем данные на сервис для регистрации
      const userData = await UserService.registration(email, username, password)
      // Создаем http куки для авторизации пользователя
      res.cookie('refreshToken', userData.refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 2592000000,
      })
      // Возвращаем данные пользователя в ответе
      return res.status(201).json(userData)
    } catch (error) {
      next(error)
    }
  }
  async login(req, res, next) {
    try {
      // Получаем данные для аутентификации от клиента
      const { email, password } = req.body
      // Отправляем данные на сервис для аутентификации
      const userData = await UserService.login(email, password)
      // Создаем http куки для авторизации пользователя
      res.cookie('refreshToken', userData.refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 2592000000,
      })
      // Возвращаем данные пользователя в ответе
      return res.status(200).json(userData)
    } catch (error) {
      next(error)
    }
  }
  async logout(req, res, next) {
    try {
      // Получаем токен обновления для авторизации пользователя
      const { refreshToken } = req.cookies
      // Отправляем данные на сервис для удаления токена обновления
      const token = await UserService.logout(refreshToken)
      // Удаляем куки авторизации пользователя
      res.clearCookie('refreshToken')
      // Возвращаем токен в ответе
      return res.status(200).json(token)
    } catch (error) {
      next(error)
    }
  }
  async activate(req, res, next) {
    try {
      const { link } = req.params
      const user = await UserService.activate(link)
      return res.redirect(process.env.CLIENT_URL)
    } catch (error) {
      next(error)
    }
  }
  async refresh(req, res, next) {
    try {
      // Получаем токен обновления для обновления авторизации пользователя
      const { refreshToken } = req.cookies
      // Отправляем данные на сервис для обновления авторизации
      const userData = await UserService.refresh(refreshToken)
      // Создаем http куки для авторизации пользователя
      res.cookie('refreshToken', userData.refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 2592000000,
      })
      // Возвращаем данные пользователя в ответе
      return res.status(200).json(userData)
    } catch (error) {
      next(error)
    }
  }
}
export default new AuthController()
