const fs = require('fs')
const path = require('path')
const toPascalCase = require('./common/to.pascal.case')

const makeMail = (name) => {
  const className = `${toPascalCase(name)}Mail`
  const fileName = `${name.toLowerCase()}.mail.js`
  const templateFileName = `${name.toLowerCase()}.ejs`

  const mailsDir = path.join(__dirname, '../mails')
  const mailTemplateDir = path.join(__dirname, '../views/mails')

  if (!fs.existsSync(mailsDir)) {
    fs.mkdirSync(mailsDir, { recursive: true })
  }

  if (!fs.existsSync(mailTemplateDir)) {
    fs.mkdirSync(mailTemplateDir, { recursive: true })
  }

  const mailFilePath = path.join(mailsDir, fileName)
  const templateFilePath = path.join(mailTemplateDir, templateFileName)

  if (fs.existsSync(mailFilePath)) {
    console.log(`❌ Mail ${className} has already existed ${mailFilePath}`)
    return
  }

  const mailContent = `const Mail = require('@config/mail');

class ${className} extends Mail {
    constructor(data) {
        super(data);
    }

    envelop() {
        return {
            from: this.data.from || process.env.MAIL_FROM_ADDRESS,
            to: this.data.to,
            subject: 'Your Email Subject'
        };
    }

    async content() {
        const context = {
            exampleData: this.data.exampleData
        };

        return super.content('${name.toLowerCase()}', context);
    }
}

module.exports = ${className};
`

  fs.writeFileSync(mailFilePath, mailContent)
  console.log(`✅ Mail ${className} has been created src/mails/${fileName}`)

  if (fs.existsSync(templateFilePath)) {
    console.log(`⚠️ Template Mail already existed: src/views/mail/${templateFileName}`)
  }
  fs.writeFileSync(templateFilePath, '')
  console.log(`✅ Template Mail has been created src/views/mail/${templateFileName}`)
}

module.exports = makeMail
