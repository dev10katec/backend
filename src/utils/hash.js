const bcrypt = require('bcryptjs')

class Hash {
  constructor() {
    this.SALT = parseInt(process.env.BCRYPT_ROUNDS, 10) || 10
  }

  async make(password) {
    return bcrypt.hash(password, this.SALT)
  }

  async check(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword)
  }
}

const hash = new Hash()
module.exports = hash
