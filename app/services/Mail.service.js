import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: +process.env.SMTP_PORT || 465,
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_API_PASSWORD,
      },
    });
  }

  async sendActivationMail(email, activationLink) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER_EMAIL,
      to: email,
      subject: `Подтверждение регистрации на ${process.env.APP_URL}`,
      text: "",
      html: `
				<h2>Для подтверждения регистрации перейдите по <a href="${process.env.APP_URL}/api/activate/${activationLink}">ссылке</a></h2>
				<p>Ссылка действительна в течение 24 часов.</p>
				<p>С уважением, администрация сайта.</p>
			`,
    });
  }
}

export default new MailService();
