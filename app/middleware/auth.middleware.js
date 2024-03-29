import ApiError from '#app/error/ApiError'
import TokenService from '#app/services/Token.service'

export default function authMiddleware(req, _res, next) {
  try {
    // Проверяем наличие токена в заголовке запроса
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return next(ApiError.Unauthorized())
    }
    const [, token] = authHeader.split(' ')
    if (!token || token === 'null') {
      return next(ApiError.Unauthorized())
    }
    // Проверяем валидность токена
    const tokenData = TokenService.validateAccessToken(token)
    if (!tokenData) {
      return next(ApiError.Unauthorized())
    }
    req.user = tokenData
    next()
  } catch (error) {
    return next(ApiError.Unauthorized())
  }
}
