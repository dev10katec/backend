const WelComeController = require('@controllers/welcome.controller')
const { createContainer, asClass } = require('awilix')
const container = createContainer()

container.register({
  // controllers
  welcomeController: asClass(WelComeController).singleton()

  // services

  // repositories

  // helpers
  // others
})

module.exports = container
