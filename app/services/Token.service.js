import JWT from "jsonwebtoken";
import TokenModel from "../models/TokenModel.js";
import dotenv from "dotenv";
dotenv.config();

class TokenService {
  async generateTokens(payload) {
    // Создаем токен доступа к приложению
    const accessToken = JWT.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "1m",
    });
    // Создаем токен для обновления доступа к приложению
    const refreshToken = JWT.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }
  async saveToken(refreshToken, userId) {
    // Ищем токен в базе данных если он есть то обновляем его иначе создаем новый
    const tokenData = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await tokenData.save();
    }
    await TokenModel.create({ user: userId, refreshToken });
  }
  async removeToken(refreshToken) {
    const tokenData = await TokenModel.deleteOne({ refreshToken });
    return tokenData;
  }
}
export default new TokenService();
