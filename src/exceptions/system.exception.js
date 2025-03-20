const { INTERNAL_SERVER_ERROR } = require('@constants/http.status.code')
const HttpException = require('@exceptions/http.exception')

class SystemException extends HttpException {
  constructor(message = 'Internal Server Error', code = INTERNAL_SERVER_ERROR) {
    super(message, code)
    this.code = code
  }
}

module.exports = SystemException
