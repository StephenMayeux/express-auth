const express = require('express')
const router = express.Router()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

router.post('/signup', (req, res) => {
  // validate the email and passsword either here or on the client

  const { email, password } = req.body
  const newUser = new User({ email, password })

  newUser.createUser(newUser, (err, user) => {
    if (err) return res.send({ err })
    res.send({ user })
  })
})

module.exports = router;
