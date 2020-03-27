const express = require('express')
const app = express()
const router = require('./router')
const cors = require('cors')
const cookieParser = require('cookie-parser')


app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser())
  .use('/', router)
  .listen(process.env.PORT || 3000)