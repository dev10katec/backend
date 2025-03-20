class HttpException extends Error {
  constructor(message, code) {
    super(message, code)
  }
}

module.exports = HttpException
