const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')
require('../services/passport')

const requireSignin = passport.authenticate('local', {
  failureRedirect: '/error'
})
const requireAuth = (req, res) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send({ success: true })
  // res.redirect to login or warning screen
}

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
