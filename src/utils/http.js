const { OK } = require('@constants/http.status.code')

class Http {
  json(res, message, status = OK, data = null) {
    return res.status(status).json({ status, message, data })
  }

  view(res, viewName, data) {
    return res.render(viewName, data)
  }
}

const http = new Http()
module.exports = http
