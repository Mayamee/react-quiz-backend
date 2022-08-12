import ApiError from "../error/ApiError.js";
import UserModel from "../models/UserModel.js";
import TokenModel from "../models/TokenModel.js";
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
  }
  async login(email, password) {}
  async logout(refreshToken) {}
  async refresh(refreshToken) {}
}
export default new UserService();
