require('dotenv').config()
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/express-auth')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('combined'))
app.use(bodyParser.json({ type: '*/*' }))


app.use(session({
  secret: process.env.SECRET,
  saveUnitialized: true,
  resave: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes'))

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Congregation is running on port', port)
})
