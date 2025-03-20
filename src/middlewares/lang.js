const i18n = require('@config/lang')

const ACCEPTED_LANG = ['vi', 'en']

const lang = (req, res, next) => {
  const lang = req.headers['accept-language']?.split(',')[0]

  ACCEPTED_LANG.includes(lang) ? i18n.setLocale(lang) : 'en'
  next()
}

module.exports = lang
