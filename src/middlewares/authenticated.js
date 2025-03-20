const JWT = require('@config/json.web.token')
const AuthException = require('@exceptions/auth.exception')

const auth = (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1]
  if (!token) {
    return next(new AuthException('Missing token'))
  }

  try {
    req.auth = JWT.verify(token, 'accessToken')
    next()
  } catch (error) {
    return next(new AuthException(error.message))
  }
}

module.exports = auth
