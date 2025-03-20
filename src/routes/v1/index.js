const validate = require('@middlewares/validation')
const { makeInvoker } = require('awilix-express')
const express = require('express')

const router = express.Router()

const welcomeController = makeInvoker((cradle) => cradle.welcomeController)

router.get('/', validate([]), welcomeController('welcome'))

module.exports = router
