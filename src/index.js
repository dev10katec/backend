require('module-alias/register') // register modules alias in package.json
require('dotenv').config()
require('@listeners/index')

const fs = require('fs')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { scopePerRequest } = require('awilix-express')
import i18n from '@config/lang'
import { specs } from '@config/swagger'
import lang from '@middlewares/lang'
import swaggerUiExpress from 'swagger-ui-express'

const container = require('@bootstrap/container')
const fileSystems = require('@config/file.system')
const view = require('@config/view')
const errorHandler = require('@middlewares/error.handler')
const notFound = require('@middlewares/not.found')
const router = require('@routes/v1')

const app = express()
const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 6996
const host = process.env.HOST_NAME?.replace(/^https?:\/\//, '') || 'localhost'

fileSystems(app)
view(app)

app.enable('trust proxy') // for use req.ip

app.use(i18n.init)
app.use(lang)
app.use(scopePerRequest(container))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs)) // should be protected middleware for api documentations (you can use passport or jwt or session)
app.use('/', router)
app.use(notFound)
app.use(errorHandler.handle)

const environments = {
  development: () => {
    const http = require('http')
    return http.createServer(app)
  },
  production: () => {
    const https = require('https')
    const sslPaths = {
      5006: {
        key: '/etc/pki/tls/private/...', // change from production key
        cert: '/etc/pki/tls/certs/...' // change from production key
      },
      default: {
        key: '/etc/pki/tls/private/...', // change from test key
        cert: '/etc/pki/tls/certs/...' // change from test key
      }
    }

    const { key: sslKey, cert: sslCert } = sslPaths[port] || sslPaths.default

    if (!fs.existsSync(sslKey) || !fs.existsSync(sslCert)) {
      throw new Error('❌ SSL certificate files not found!')
    }

    const httpsOptions = {
      key: fs.readFileSync(sslKey, 'utf-8'),
      cert: fs.readFileSync(sslCert, 'utf-8')
    }

    return https.createServer(httpsOptions, app)
  }
}

const server = (environments[env] || environments['development'])()
server.listen(port, host, () => {
  console.log(`🚀 Server running on ${env === 'production' ? 'HTTPS' : 'HTTP'}: [${host}:${port}]`)
})
