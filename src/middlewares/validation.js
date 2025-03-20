const ValidationException = require('@exceptions/validation.exception')
const { validationResult } = require('express-validator')

/**
 * Middleware function to validate incoming requests based on specified validations.
 * @param {Array} validations - Array of validation functions to be executed.
 * @returns {Function} Express validator middleware function.
 */
const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)))
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const messages = errors.array().reduce((accumulator, { path, msg }) => {
      accumulator[path] = [...(accumulator[path] || []), msg]
      return accumulator
    }, {})

    Object.keys(messages).forEach((path) => {
      messages[path] = messages[path].join('. ')
    })

    return next(new ValidationException(messages))
  }

  next()
}

module.exports = validate
