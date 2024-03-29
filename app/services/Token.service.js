import JWT from 'jsonwebtoken'
import TokenModel from '#app/models/TokenModel'
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '#app/env'

class TokenService {
  async generateTokens(payload) {
    // Создаем токен доступа к приложению
    const accessToken = JWT.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: '10m',
    })
    // Создаем токен для обновления доступа к приложению
    const refreshToken = JWT.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: '30m',
    })
    return { accessToken, refreshToken }
  }
  async saveToken(refreshToken, userId) {
    // Ищем токен в базе данных если он есть то обновляем его иначе создаем новый
    const tokenData = await TokenModel.findOne({ user: userId })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return await tokenData.save()
    }
    await TokenModel.create({ user: userId, refreshToken })
  }
  async removeToken(refreshToken) {
    const tokenData = await TokenModel.deleteOne({ refreshToken })
    return tokenData
  }
  async findToken(refreshToken) {
    const tokenData = await TokenModel.findOne({ refreshToken })
    return tokenData
  }
  validateRefreshToken(refreshToken) {
    try {
      const tokenData = JWT.verify(refreshToken, JWT_REFRESH_SECRET)
      return tokenData
    } catch (err) {
      return null
    }
  }
  validateAccessToken(accessToken) {
    try {
      const tokenData = JWT.verify(accessToken, JWT_ACCESS_SECRET)
      return tokenData
    } catch (err) {
      return null
    }
  }
}
export default new TokenService()
