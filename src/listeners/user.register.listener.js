import event from '@events/index'

class UserRegisterListener {
  constructor() {
    this.registerEvents()
  }

  registerEvents() {
    event.on('registered', this.registered)
  }

  registered(user) {
    console.log('user registered: ', user)
    // socket handler
    // email handler
    // do something
  }
}

module.exports = UserRegisterListener
