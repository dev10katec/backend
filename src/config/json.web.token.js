const AuthException = require('@exceptions/auth.exception')
const SystemException = require('@exceptions/system.exception')
const jwt = require('jsonwebtoken')

class JsonWebToken {
  constructor() {
    const { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, ACCESS_TOKEN_TIME_OUT, REFRESH_TOKEN_TIME_OUT } =
      process.env

    this.tokenKeys = {
      accessToken: ACCESS_TOKEN_KEY,
      refreshToken: REFRESH_TOKEN_KEY,
      accessTokenTimeout: ACCESS_TOKEN_TIME_OUT,
      refreshTokenTimeout: REFRESH_TOKEN_TIME_OUT
    }

    if (!ACCESS_TOKEN_KEY || !REFRESH_TOKEN_KEY) {
      throw new jwt.JsonWebTokenError('Token keys are not set in environment', error)
    }
  }

  getTokenType(type) {
    switch (type) {
      case 'accessToken':
        return this.tokenKeys.accessTokenTimeout
      case 'refreshToken':
        return this.tokenKeys.refreshTokenTimeout
      default:
        throw new SystemException('Not allowed token type')
    }
  }

  /**
   * Generates a JSON Web Token (JWT) for the given data and token type.
   *
   * @param {Object} data - The payload data to be encoded in the token.
   * @param {'accessToken' | 'refreshToken'} [type='accessToken'] - The type of token, either 'accessToken' or 'refreshToken'.
   * @throws {SystemException} If the token key is not configured.
   * @returns {string} The signed JWT.
   */
  generate(data = {}, type = 'accessToken') {
    const key = this.tokenKeys[type]
    const expiresIn = this.getTokenType(type)

    return jwt.sign(data, key, { expiresIn })
  }

  /**
   * Verifies a JSON Web Token (JWT) using the specified token type.
   *
   * @param {string} token - The JWT to be verified.
   * @param {'accessToken' | 'refreshToken'} [type='accessToken'] - The type of token, either 'accessToken' or 'refreshToken'.
   * @throws {AuthException} If the token is invalid or expired.
   * @returns {Object} The decoded payload if the token is valid.
   */
  verify(token, type = 'accessToken') {
    const key = this.tokenKeys[type]

    try {
      return jwt.verify(token, key)
    } catch (error) {
      const messages = {
        JsonWebTokenError: 'Invalid token',
        TokenExpiredError: `Token has expired at: ${error.expiredAt}`
      }
      const message = messages[error.name] || 'Authentication error'
      throw new AuthException(message)
    }
  }
}

const JWT = new JsonWebToken()
module.exports = JWT
