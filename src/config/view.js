const view = (app) => {
  app.set('view engine', 'ejs')
  app.set('views', './src/views')
}

module.exports = view
