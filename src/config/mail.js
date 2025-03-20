const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

class Mail {
  constructor(data) {
    this.data = data
    this.transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      secure: process.env.MAIL_SECURE,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
      }
    })
  }

  envelop() {
    return {
      from: this.data.from || process.env.MAIL_FROM_ADDRESS,
      to: this.data.to,
      subject: this.data.subject
    }
  }

  content(template, context) {
    const templatePath = path.join(__dirname, `../views/mail/${template}.ejs`)
    const templateContent = fs.readFileSync(templatePath, 'utf-8')

    return ejs.render(templateContent, context)
  }

  attachments() {
    return []
  }

  async send(template, context) {
    const mailOptions = {
      ...this.envelop(),
      html: this.content(template, context),
      attachments: this.attachments()
    }

    return this.transporter.sendMail(mailOptions)
  }
}

module.exports = Mail
