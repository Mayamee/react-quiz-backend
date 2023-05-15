import nodemailer from 'nodemailer'
import {
  APP_URL,
  SMTP_API_PASSWORD,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_USER_EMAIL,
} from '../env.js'
class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT || 465,
      secure: SMTP_PORT === '465',
      auth: {
        user: SMTP_USER,
        pass: SMTP_API_PASSWORD,
      },
    })
  }

  async sendActivationMail(email, activationLink) {
    await this.transporter.sendMail({
      from: SMTP_USER_EMAIL,
      to: email,
      subject: `Подтверждение регистрации на ${process.env.APP_URL}`,
      text: '',
      html: `
				<h2>Для подтверждения регистрации перейдите по <a href="${APP_URL}/api/auth/activate/${activationLink}">ссылке</a></h2>
				<p>Ссылка действительна в течение 24 часов.</p>
				<p>С уважением, администрация сайта.</p>
			`,
    })
  }
}

export default new MailService()
