const path = require('path')
const i18n = require('i18n')

const defaultLocale = process.env.LOCALE ? process.env.APP_LOCALE : 'en'

i18n.configure({
  locales: ['en', 'vi'],
  directory: path.join(__dirname, '../lang'),
  defaultLocale,
  objectNotation: true,
  fallbacks: { vi: 'en' },
  register: global
})

export default i18n
