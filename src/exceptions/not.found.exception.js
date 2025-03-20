const { NOT_FOUND } = require('@constants/http.status.code')
const HttpException = require('@exceptions/http.exception')

class NotFoundException extends HttpException {
  constructor(message = 'Not Found', code = NOT_FOUND) {
    super(message)
    this.code = code
  }
}

module.exports = NotFoundException
