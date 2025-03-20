const { SequelizeScopeError } = require('sequelize')

class SqlException extends SequelizeScopeError {} // completed and use in error handler middleware
// docs: https://github.com/sequelize/sequelize/blob/51ac9241b5a37a1c26bcf30bc0363d2c87326066/packages/core/src/errors/sequelize-scope-error.ts#L6

module.exports = SqlException
