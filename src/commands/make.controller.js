const fs = require('fs')
const path = require('path')
const toPascalCase = require('./common/to.pascal.case')

const makeController = (name) => {
  const className = `${toPascalCase(name)}Controller`
  const fileName = `${name.toLowerCase()}.controller.js`
  const controllersDir = path.join(__dirname, '../controllers')

  if (!fs.existsSync(controllersDir)) {
    fs.mkdirSync(controllersDir, { recursive: true })
  }

  const filePath = path.join(controllersDir, fileName)
  if (fs.existsSync(filePath)) {
    console.log(`❌ Controller ${className} already existed.`)
    return
  }

  const content = `const Controller = require('@controllers/controller');
const http = require('@utils/http');

class ${className} extends Controller {
    async index(req, res) {
      return http.json(res, { message: 'Hello world!!!' });
    }

    async store(req, res) {
      // do something
    }

    async update(req, res) {
      // do something
    }

    async destroy(req, res) {
      // do something
    }
}

module.exports = ${className};`

  fs.writeFileSync(filePath, content)
  console.log(`✅ Controller ${className} has been created src/controllers/${fileName}`)
}

module.exports = makeController
