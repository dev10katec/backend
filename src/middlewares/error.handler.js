const { INTERNAL_SERVER_ERROR } = require('@constants/http.status.code')
const HttpException = require('@exceptions/http.exception')

class ErrorHandler {
  constructor() {
    this.handle = this.handle.bind(this)
  }

  handleHttpException = (err, res) => {
    return res.status(err.code).json({ status: err.code, message: err.message })
  }

  handleGenericError(res) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ status: INTERNAL_SERVER_ERROR, message: 'Internal Server Error' })
  }

  handle(err, req, res, next) {
    this.logger(err)

    switch (true) {
      case err instanceof HttpException:
        return this.handleHttpException(err, res)
      default:
        return this.handleGenericError(res)
    }
  }

  logger(err) {
    console.error(`Error: ${err.message}`)
    console.error(`Stack: ${err.stack}`)

    // you can use logging by winston or anything else
  }
}

const errorHandler = new ErrorHandler()
module.exports = errorHandler
