const { EventEmitter } = require('events')

class Event extends EventEmitter {
  static instance

  constructor() {
    if (!Event.instance) {
      super()
      Event.instance = this
    }
    return Event.instance
  }
}

const event = new Event()
module.exports = event
// or u can extend the EventEmitter class
