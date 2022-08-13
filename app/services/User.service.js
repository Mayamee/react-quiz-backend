import ApiError from "../error/ApiError.js";
import UserModel from "../models/UserModel.js";
import TokenService from "./Token.service.js";
import MailService from "./Mail.service.js";
import UserDTO from "../dtos/UserDTO.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
dotenv.config();

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest("User already exists");
    }
    // хешируем пароль (data, saltRounds)
    const hashedPassword = await bcrypt.hash(
      password,
      +process.env.BCRYPT_ROUNDS
    );
    // генерируем уникальный линк для активации
    const activationLink = uuid();
    // создаем нового пользователя и сохраняем в базе
    const user = await UserModel.create({
      email,
      password: hashedPassword,
      activationLink,
    });
    // отправляем письмо пользователю со ссылкой для активации
    await MailService.sendActivationMail(email, activationLink);
    // создаем DTO для генерации токенов
    const userDTO = new UserDTO(user);
    // генерируем jwt токены для доступа (access) и обновления доступа (refresh)
    const tokens = await TokenService.generateTokens({ ...userDTO });
    // сохраняем токены в базе
    await TokenService.saveToken(tokens.refreshToken, userDTO.id);
    return {
      ...userDTO,
      ...tokens,
    };
  }
  async login(email, password) {
    // Ищем пользователя по email
    const user = await UserModel.findOne({ email });
    // Если пользователь не найден или пароль не верен то выбрасываем ошибку
    if (!user) {
      throw ApiError.BadRequest("User not found");
    }
    // Если пароль не верен то выбрасываем ошибку
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // Если пароль не верен то выбрасываем ошибку
    if (!isPasswordValid) {
      throw ApiError.BadRequest("Invalid password");
    }
    // Если пароль верен то генерируем jwt токены для доступа (access) и обновления доступа (refresh)
    const userDTO = new UserDTO(user);
    const tokens = await TokenService.generateTokens({ ...userDTO });
    await TokenService.saveToken(tokens.refreshToken, userDTO.id);
    return {
      ...userDTO,
      ...tokens,
    };
  }
  async logout(refreshToken) {
    return await TokenService.removeToken(refreshToken);
  }
  async refresh(refreshToken) {
    // Если refreshToken не передан то выбрасываем ошибку
    if (!refreshToken) {
      throw ApiError.Unauthorized();
    }
    // Проверяем токен на валидность
    const tokenData = await TokenService.validateRefreshToken(refreshToken);
    if (!tokenData) {
      throw ApiError.Unauthorized();
    }
    // Ищем токен в базе данных
    const isTokenFinded = await TokenService.findToken(refreshToken);
    // Если токен не найден или не валиден то выбрасываем ошибку
    if (!tokenData || !isTokenFinded) {
      throw ApiError.Unauthorized();
    }
    // Ищем пользователя по id из токена
    const user = await UserModel.findById(tokenData.id);
    // Создаем DTO для генерации токенов
    const userDTO = new UserDTO(user);
    // Генерируем jwt токены для доступа (access) и обновления доступа (refresh)
    const tokens = await TokenService.generateTokens({ ...userDTO });
    // Сохраняем токены в базе
    await TokenService.saveToken(tokens.refreshToken, userDTO.id);
    // Возвращаем обновленные токены и данные пользователя
    return {
      ...userDTO,
      ...tokens,
    };
  }
}
export default new UserService();
