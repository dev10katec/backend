const { FORBIDDEN } = require('@constants/http.status.code')
const HttpException = require('@exceptions/http.exception')

class ForbiddenException extends HttpException {
  constructor(message = 'Forbidden', code = FORBIDDEN) {
    super(message)
    this.code = code
  }
}

module.exports = ForbiddenException
