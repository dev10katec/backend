const { BAD_REQUEST } = require('@constants/http.status.code')
const HttpException = require('@exceptions/http.exception')

class BadRequestException extends HttpException {
  constructor(message = 'Forbidden', code = BAD_REQUEST) {
    super(message)
    this.code = code
  }
}

module.exports = BadRequestException
