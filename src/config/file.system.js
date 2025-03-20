const storage = require('@utils/storage')
const express = require('express')

const fileSystems = (app) => {
  app.use('/', express.static(storage.publicPath()))
}

module.exports = fileSystems
