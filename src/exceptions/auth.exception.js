const { UNAUTHORIZED } = require('@constants/http.status.code')
const HttpException = require('@exceptions/http.exception')

class AuthException extends HttpException {
  constructor(message = 'Unauthenticated', code = UNAUTHORIZED) {
    super(message)
    this.code = code
  }
}

module.exports = AuthException
