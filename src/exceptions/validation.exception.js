const { UNPROCESSABLE_ENTITY } = require('@constants/http.status.code')
const HttpException = require('@exceptions/http.exception')

class ValidationException extends HttpException {
  constructor(message = 'Validation exception', code = UNPROCESSABLE_ENTITY) {
    super()
    this.message = message
    this.code = code
  }
}

module.exports = ValidationException
