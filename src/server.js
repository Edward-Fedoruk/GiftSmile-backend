require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const db = require('./db')
const checkToken = require('./middlewares/checkToken.js')

const secret = 'worldisfullofdevelopers'

class HandlerGenerator {
  login(req, res) {
    const { username } = req.body
    const { password } = req.body
    // For the given username fetch user from DB
    const mockedUsername = 'admin'
    const mockedPassword = 'password'
    if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
        const token = jwt.sign(
          { username },
          secret,
          { expiresIn: '24h' },
        )
        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: 'Authentication successful!',
          token,
        })
      } else {
        res.sendStatus(403).json({
          success: false,
          message: 'Incorrect username or password',
        })
      }
    } else {
      res.sendStatus(400).json({
        success: false,
        message: 'Authentication failed! Please check the request',
      })
    }
  }

  index(req, res) {
    res.json({
      success: true,
      message: 'Index page',
    })
  }
}

// Starting point of the server
function main() {
  const app = express() // Export app for other routes to use
  const handlers = new HandlerGenerator()
  const port = process.env.PORT || 5000
  app.use(bodyParser.urlencoded({ // Middleware
    extended: true,
  }))
  app.use(bodyParser.json())
  // Routes & Handlers
  app.post('/login', handlers.login)
  app.get('/', checkToken, handlers.index)
  app.listen(port, () => console.log(`Server is listening on port: ${port}`))
}

main()
