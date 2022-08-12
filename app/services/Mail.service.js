import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

class MailService {
  constructor() {}
  async sendActivationMail(email, activationLink) {}
}
export default new MailService();
