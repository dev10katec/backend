const path = require('path')
const swaggerJsdoc = require('swagger-jsdoc')

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 6969
const version = process.env.VERSION || 'v1'

const swaggerDefinition = {
  info: {
    title: 'APIs',
    version: '1.0.0',
    description: 'APIs Documentation'
  },
  host: `${host}:${port}/${version}`
}

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../documents/**/*.yaml')]
}

export const specs = swaggerJsdoc(options)
