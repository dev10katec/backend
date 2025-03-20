const Controller = require('@controllers/controller')
const http = require('@utils/http')

class WelComeController extends Controller {
  async welcome(req, res) {
    const userAgent = req.get('user-agent')

    return http.view(res, 'welcome', { userAgent })
  }
}

module.exports = WelComeController
