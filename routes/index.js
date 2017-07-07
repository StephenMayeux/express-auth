const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')
require('../services/passport')

// add this variable before POST /signin route handler
const requireSignin = passport.authenticate('local', {
  failureRedirect: '/error'
})

// add this variable to all routes you want protected
const requireAuth = (req, res) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send({ msg: 'no signed in' })
  // res.redirect to login or warning screen
}

router.get('/', (req, res) => {
  res.send({ success: true })
  // or your home screen
})

router.get('/secret', requireAuth, (req, res) => {
  res.send({ secret: 'no salsa in the house!' })
})

router.post('/signup', (req, res) => {
  // validate the email and passsword either here or on the client

  const { email, password } = req.body
  const newUser = new User({ email, password })

  newUser.createUser(newUser, (err, user) => {
    // res.render an error page
    if (err) return res.send({ err })

    // In this case, you would res.redirect('/some/path') to a template
    res.send({ user })
  })
})

router.post('/signin', requireSignin, (req, res) => {
  // res.redirect('/some/path')
  res.send({ success: true })
})

module.exports = router;
