const NotFoundException = require('@exceptions/not.found.exception')

const notFound = (req, res, next) => {
  return next(new NotFoundException(`Not Found - ${req.originalUrl}`))
}

module.exports = notFound
